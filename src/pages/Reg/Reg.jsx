import React from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

import userApi from "../../api/UserApi"

import './Reg.css'
import { LOGIN_MAX, LOGIN_MIN, PASSWORD_MAX, PASSWORD_MIN } from '../../consts'
import { useContext } from 'react'

import { Context } from '../../index'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

const Reg = observer(props => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const reg = () => {
        if (localStorage.getItem('token') != null)
        return setError('У вас уже есть аккаунт, сначала выйдите !' )
    else if (login.length < LOGIN_MIN)
        return setError('Слишком короткий логин !' )
    else if (login.length > LOGIN_MAX)
        return setError('Сликшом длинный логин !' )
    else if (password.length < PASSWORD_MIN)
        return setError('Слишком короткий пароль !' )
    else if (password.length > PASSWORD_MAX)
        return setError('Слишком длинный пароль !' )
    else if (password !== repeatPassword)
        return setError('Пароли не совпадают !' )

    setError('');

    userApi.Reg(login, password).then(res => setError(res))
    }

    return (
        <div className='d-flex align-items-center py-4 bg-dark vh-100'>
            <main className='form-reg w-100 m-auto'>

                <h1 className="h3 mb-5 fw-normal text-center text-light">
                    Регистрация аккаунта
                </h1>

                <Form>
                <FloatingLabel controlId="floatingInput" label="Логин">
                        <Form.Control type="text" placeholder='Логин' className="input-login" onChange={e => setLogin(e.target.value) } />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Пароль">
                        <Form.Control type="password" placeholder='Пароль' className="input-password br-0" onChange={e => setPassword(e.target.value) } />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Повторите пароль">
                        <Form.Control type="password" placeholder='Повторите пароль' className="input-repeat-password" onChange={e => setRepeatPassword(e.target.value ) } />
                    </FloatingLabel>

                    <Form.Check
                        type="checkbox"
                        label="Запомнить меня"
                        className='text-light my-2'
                    />
                    <label className='text-danger my-2'>{error}</label>
                    <Button className="w-100" size='lg'
                        onClick={
                            event => {
                                event.preventDefault();
                                reg();
                            }
                        }
                    >
                        Зарегистрироваться
                    </Button>

                    <label className='text-white mt-3 small text-center w-100'>
                        Уже есть аккаунт ? <br />
                        Тогда <a href="/login">
                            войдите в аккаунт
                        </a>
                    </label>

                </Form>

            </main>
        </div>

    )
})

export default Reg