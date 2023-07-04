import React, { useState } from "react";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import { Form, FloatingLabel, Container, Button } from "react-bootstrap";
import filmApi from "../../../api/FilmApi";

import './FilmAddFilm.css'

const FilmAddFilm = (props) => {
    const [filmName, setFilmName] = useState(null);
    const [filmDuration, setFilmDuration] = useState(null);
    const [filmHref, setFilmHref] = useState(null);
    const [filmPoster, setFilmPoster] = useState(null);
    const [error, setError] = useState(null);

    const addFilm = () => {
        if (filmName == null)
            return setError('Введите название фильма !')
        else if (filmName.length < 3)
            return setError('Слишком короткое название !')
        else if (filmDuration == null || filmDuration <= 0)
            return setError('Введите длительность фильма !')
        else if (filmHref == null || filmHref.length < 10)
            return setError('Неверная ссылка на видео !')
        else if (filmPoster == null)
            return setError('Укажите постер для фильма !')

        setError(null)
        
        filmApi.addFilm(filmName, filmDuration, filmHref, filmPoster)   
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <main className="m-auto col-xxl-4 col-sm-6 col-6 px-md-4 shadow-lg bg-dark shadow-lg ">
                        <h4 className="my-4">Добавление фильма</h4>
                        <Form className="my-3">

                        <FloatingLabel controlId="floatingInput" label="Название" className="floating-label-bg-transparent my-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Название"
                                    className="br-0 bg-dark text-light"
                                    onChange={e => {
                                        setFilmName(e.currentTarget.value)
                                    }}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Длительность (в минутах)" className="floating-label-bg-transparent my-2">
                                <Form.Control
                                    type="number"
                                    placeholder="Длительность (в минутах)"
                                    className="br-0 bg-dark text-light"
                                    min={0}
                                    max={400}
                                    onChange={e => {
                                        setFilmDuration(e.currentTarget.value)
                                    }}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Адрес к видео" className="floating-label-bg-transparent my-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Адрес к видео"
                                    className="br-0 bg-dark text-light"
                                    onChange={e => {
                                        setFilmHref(e.currentTarget.value)
                                    }}
                                />
                            </FloatingLabel>

                            <Form.Group className="my-2">
                                <Form.Label className="small">Постер</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="br-0 bg-dark text-light p-3"
                                    onChange={e => {
                                        setFilmPoster(e.currentTarget)
                                        console.log(filmPoster)
                                    }}
                                />
                            </Form.Group>
                            {
                                error ? <span className="text-danger small">{error}</span> : <></>
                            }
                            <Button size="lg" className="w-100 br-0 my-2 btn-primary py-2" onClick={e => {e.preventDefault(); addFilm();}}>
                                Добавить
                            </Button>

                        </Form>

                    </main>

                </div>
            </div>
        </>
    )

}

export default FilmAddFilm