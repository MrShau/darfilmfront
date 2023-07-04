import React from 'react'
import {FloatingLabel, Form, Button} from 'react-bootstrap'
import { LOGIN_MAX, LOGIN_MIN, PASSWORD_MAX, PASSWORD_MIN } from '../../consts'
import userApi from '../../api/UserApi'

import './Login.css'

class Login extends React.Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            login: '',
            password: '',
            error: '',
        }
    }

    render()
    {
        return (
            <body className='d-flex align-items-center py-4 bg-dark'>
                <main className='form-login w-100 m-auto'>
                
                <h1 className="h3 mb-5 fw-normal text-center text-light">
                    Вход в аккаунт
                </h1>

                <Form>

                    <FloatingLabel controlId="floatingInput" label="Логин">
                        <Form.Control type="text" placeholder='Логин' onChange={e => this.setState({login : e.target.value})}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Пароль">
                        <Form.Control type="password" placeholder='Пароль' onChange={e => this.setState({password : e.target.value})}/>
                    </FloatingLabel>

                    <Form.Check
                        type="checkbox"
                        label="Запомнить меня"
                        className='text-light my-2'
                    />
                    <label className='text-danger my-2'>
                        {this.state.error}
                    </label>
                    <Button className="w-100" size='lg' onClick={e => {
                        e.preventDefault();
                        this.login();
                    }}>
                        Войти
                    </Button>
                    
                    <label className='text-white mt-3 small text-center w-100'>
                        Нет аккаунта ? <br/>
                        Тогда <a href="/reg">
                            пройдите регистрацию
                        </a>
                    </label>

                </Form>

                <script>
                    document.getElementsByTagName("body").c
                </script>
            </main>
            </body>
            
        )
    }

    login()
    {
        if (localStorage.getItem('token') != null)
            return this.setState({error : 'У вас уже есть аккаунт, сначала выйдите !'})
        else if (this.state.login.length < LOGIN_MIN || this.state.login.length > LOGIN_MAX)
            return this.setState({error : 'Неверный логин !'})
        else if (this.state.password.length < PASSWORD_MIN || this.state.password.length > PASSWORD_MAX)
            return this.setState({error : 'Неверный пароль !'})

        this.setState({error: ''})

        userApi.Login(this.state.login, this.state.password).then(res => this.setState({error: res}))

    }
}

export default Login
