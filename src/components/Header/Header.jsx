import React from "react";
import {
    Navbar, Container, Image,
    Form, Button, Dropdown
}
    from "react-bootstrap";

import logo from '../../img/logo.png'
import search from '../../img/search.png'
import profile from '../../img/profile_default.png'

import './Header.css'
import { useContext } from "react";
import { Context } from "../../index";
import Sidebar from "../Admin/Sidebar/Sidebar";

const Header = () => {
    const { user } = useContext(Context)
    return (
        <>
            {
                user.isAuth ?
                    <Navbar bg="dark" variant="dark" className="ff-roboto shadow-lg" expand="md">
                        <Container>
                            <Navbar.Brand href="/" className="me-0 d-none d-sm-block ">
                                <Image src={logo} width='50' className="me-0 me-md-3" />
                            </Navbar.Brand>

                            <Navbar.Toggle aria-controls="header-nav" />
                            <Navbar.Collapse id="header-nav">
                                <div className="w-100 d-flex my-3 my-md-0 justify-content-between align-items-center">
                                    <Form className="col-6 col-md-5 col-lg-5 col-xl-4 mx-md-auto mx-2">
                                        <Form.Group className="d-flex">

                                            <Form.Control
                                                className="form-search br-0 border-1 col-12 col-md-6 bg-dark text-light py-2"
                                                type="search"
                                                placeholder="Введите название фильма"
                                            />


                                            <Button
                                                className="btn-search br-0"
                                            >
                                                <Image src={search} width="20" />
                                            </Button>
                                        </Form.Group>
                                    </Form>



                                    <Dropdown drop="start">
                                        <Dropdown.Toggle variant="dark">
                                            <Image src={profile} width="46" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="br-0" variant="dark">
                                            <Dropdown.Item href="/">{user?.user?.login}</Dropdown.Item>
                                            <Dropdown.Divider color={"white"} />
                                            {
                                                user.isAdmin ?
                                                    <>
                                                        <Dropdown.Item href="/admin/user/table">Админ-панель</Dropdown.Item>
                                                        <Dropdown.Divider color={"white"} />

                                                    </>
                                                    :
                                                    <></>
                                            }

                                            <Dropdown.Item href="/">Настройки профиля</Dropdown.Item>
                                            <Dropdown.Item href="/">Друзья</Dropdown.Item>
                                            <Dropdown.Item href="/">История</Dropdown.Item>
                                            <Dropdown.Divider color={"white"} />
                                            <Dropdown.Item onClick={e => {
                                                e.preventDefault();
                                                localStorage.removeItem('token');
                                                window.location.reload();
                                            }}>Выйти</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                            </Navbar.Collapse>

                        </Container>
                    </Navbar>
                    : <></>
            }
        </>

    )
}

export default Header;