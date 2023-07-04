import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Col } from "react-bootstrap";
import * as signalR from "@microsoft/signalr"
import { SERVER_BASE } from "../../consts";


const VideoPlayer = (props) => {

    const [connection, setConnection] = useState(null)

    const videoRef = useRef();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_BASE}/watch?roomId=${props.roomId}`)
            .withAutomaticReconnect()
            .build()
        newConnection.start()
        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (connection) {
            try {
                connection.on(`OnPlay`, (time) => {
                    try {
                        videoRef.current.currentTime = time
                        if (videoRef.current.paused)
                            videoRef.current.play();
                    }
                    catch (err) { }
                })

                connection.on(`OnPause`, () => {
                    if (!videoRef.current.paused)
                        videoRef.current.pause();
                })
            }
            catch (err) { }
        }
    })

    const sendOnPlay = () => {
        const time = parseFloat(videoRef.current.currentTime)
        connection.invoke(`Play`, time)
    }
    const sendOnPause = () => connection.invoke(`Pause`)


    return (
        <Col sm={12}>

            <video
                src={props.src}
                width="100%"
                controls
                ref={videoRef}
                onPlay={e => sendOnPlay()}
                onPause={e => sendOnPause()}
                muted="muted"
            />
        </Col>
    );

}

export default VideoPlayer