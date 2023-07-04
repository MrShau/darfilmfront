import React, { useContext } from "react";
import * as signalR from '@microsoft/signalr'
import { useState } from "react";
import { useEffect } from "react";
import { SERVER_BASE } from '../../consts'
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Button, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import './Chat.css'

const Chat = observer((props) => {

    const [connection, setConnection] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const { user } = useContext(Context);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_BASE}/chat?roomId=${props.roomId}`)
            .withAutomaticReconnect()
            .build();
        newConnection.start()
        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (connection) {
            connection.on(`ReceiveMessage`, (message, login) => {
                setMessages([...messages, { message, login, date: new Date().toLocaleString() }])
            })

        }
    }, [connection, messages])


    return (
        <>
            <ListGroup className="my-2 ff-roboto chat overflow-auto" style={{maxHeight: '300px'}}>
                {
                    messages.map((msg, index) =>(
                        <ListGroup.Item
                            key={index}
                            className="bg-dark border-0 border-bottom text-white d-flex justify-content-between"
                            style={{ borderRadius: 0 }}>
                            <div className="ms-2 me-auto">
                                <span className="small text-secondary pe-2">{msg.login}:</span> {msg.message}
                            </div>
                            <span className="small text-secondary">{msg.date}</span>

                        </ListGroup.Item>)
                    )
                }
            </ListGroup>

            <Form
                onSubmit={e => {
                    e.preventDefault();
                    if (newMessage != null && newMessage.length > 0)
                    {
                        connection.invoke("SendMessage", newMessage, user.user.login);
                        setNewMessage("");
                    }
                }}
                className="my-3"
            >
                    <Form.Control
                        type="text"
                        value={newMessage}
                        placeholder="Напишите что-нибудь"
                        onChange={e => setNewMessage(e.target.value)}
                        className="br-0 bg-dark text-white my-2 input-message"
                    />
                <Button type='submit' variant="outline-light w-100 br-0 my-2">Отправить</Button>
            </Form>

        </>
    )

})

export default Chat