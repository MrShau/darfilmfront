import React from "react"
import './Home.css'
import Header from "../../components/Header/Header";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import FilmApi from "../../api/FilmApi";
import { useState } from "react";
import { SERVER_BASE } from "../../consts";
import { redirect } from "react-router-dom";


const Home = (props) => {

    const [films, setFilms] = useState([]);

    if (films.length <= 0) {
        FilmApi.getFilms(1, 12)
            .then(res => setFilms(res))
    }

    return (
        <Container className="my-5">
            <Row sm="1" md="2" lg="3" xxl="4">
                {
                    films.map(film => (
                        <Col key={film.id}>
                            <Card bg="dark" className="text-white shadow ff-roboto">
                                <Card.Img variant="top" src={`${SERVER_BASE}/${film.posterUrl}`} style={{height: "300px", objectFit: 'cover'}} />
                                <Card.Body className="m-0 p-2">
                                    <Card.Title className="text-center my-2" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{film.name}</Card.Title>
                                    <Button variant="outline-light" className="br-0 w-100 my-2" href={`/watch?id=${film.id}&roomId=${Math.random().toString(36).substr(2, 9) + '_' + Date.now()}`}>Смотреть</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

            </Row>
        </Container>
    )
}

export default Home;