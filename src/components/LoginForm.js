import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BaseBtn from "./BaseBtn";

import "./LoginForm.css";
import logoLock from './img/lock.svg'; //подключаем картинку
import loginGoogle from './img/google.svg';
import loginFacebook from './img/facebook.svg';
import loginYandex from './img/yandex.svg';

import { useDispatch } from "react-redux";
import { userAuth } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ user }) => {
    const dispatch = useDispatch();
    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    let navigate = useNavigate();

    const loginUser = (inputLogin, inputPassword) => {
        const { isAuth } = user;
        
        dispatch(userAuth(inputLogin, inputPassword));
        ({isAuth}) ? navigate("/") : console.log('ошибка');
    }

    return (
        <div className="group-form">
            <div className="login-lock">
                <img src = {logoLock} alt="lock" />
            </div>
            <div className="login-form">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab selected = {true}>Войти</Tab>
                        <Tab disabled = {true}>Зарегистрироваться</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="input-group">
                            <label>
                                <div  className="label-input">Логин или номер телефона:</div>
                                <input 
                                    className="input input-login" 
                                    name = "inputLogin" 
                                    value={inputLogin}
                                    onChange={(e) => setInputLogin(e.target.value)}
                                />
                            </label>
                            
                            <br />
                            <label>
                                <div className="label-input">Пароль:</div>
                                <input 
                                    className="input input-password" 
                                    type="password" 
                                    name = "inputPassword" 
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        
                        <BaseBtn 
                            onClick={ () => loginUser(inputLogin, inputPassword) }>
                            Войти
                        </BaseBtn>
                        
                        
                        <div className="recovery-link">
                            <a className="link" href="/">Восстановить пароль</a>
                        </div>

                        <div className="login-via">
                            <p>Войти через:</p>
                            <div className="btn-via-group">
                                <button className="btn-via" disabled = {true}><img src = {loginGoogle} alt="google" /></button>
                                <button className="btn-via" disabled = {true}><img src = {loginFacebook} alt="facebook" /></button>
                                <button className="btn-via" disabled = {true}><img src = {loginYandex} alt="yandex" /></button>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

                
                

            </div>
        </div>
    );
};

export default LoginForm;