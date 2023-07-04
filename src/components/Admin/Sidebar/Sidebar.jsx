import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaTable, FaUser, FaChartLine, FaUserCog, FaFilm, FaVideo, FaBars } from 'react-icons/fa'

import './Sidebar.css'

const Sidebar = (props) => {


    return (
        <Navbar expand="lg" className={`col-xxl-2 col-lg-3 col-12 text-light py-0 pe-0`}>
            <Navbar.Toggle aria-controls="nav-sidebar" className="border-white py-2 m-2">
                <FaBars color="white"/>
            </Navbar.Toggle>
            <Navbar.Collapse id="nav-sidebar">
                <Nav className={`flex-column shadow-lg w-100 text-light py-0 pe-0`}>
                    <h6 className="border-bottom sidebar-heading d-flex px-3 mt-3 py-3 text-light text-uppercase small">
                        <FaUser />
                        <span className="mx-3">Пользователи</span>
                    </h6>

                    <Nav.Link href="/admin/user/table" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaTable />
                        <span className="mx-3">Таблица</span>
                    </Nav.Link>

                    <Nav.Link href="/admin/user/statistics" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaChartLine />
                        <span className="mx-3">Статистика</span>
                    </Nav.Link>

                    <Nav.Link href="/admin/user/addadmin" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaUserCog />
                        <span className="mx-3">Добавить админа</span>
                    </Nav.Link>


                    <h6 className="border-bottom sidebar-heading d-flex px-3 mt-3 py-3 text-light text-uppercase small">
                        <FaFilm />
                        <span className="mx-3">Фильмы и сериалы</span>
                    </h6>

                    <Nav.Link href="/home" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaTable />
                        <span className="mx-3">Таблица</span>
                    </Nav.Link>

                    <Nav.Link href="/home" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaChartLine />
                        <span className="mx-3">Статистика</span>
                    </Nav.Link>

                    <Nav.Link href="/admin/film/add" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaVideo />
                        <span className="mx-3">Добавить фильм</span>
                    </Nav.Link>

                    <Nav.Link href="/home" className='btn br-0 text-start text-light ps-3 btn-dark'>
                        <FaVideo />
                        <span className="mx-3">Добавить сериал</span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}

export default Sidebar