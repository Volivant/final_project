import React from "react";
import LoginForm from "./LoginForm";

import "./Login.css";

import loginImg from '../img/people_key.svg'; //подключаем картинку


const Login = ({ user }) => {
    
    return (
        <div className="login-group">
            <div className="login-title">
                <h2>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
            </div>
            <div className = "login-img">
                <img src = {loginImg} alt="people and key" />
            </div>
            <div className = "login-container">
                <LoginForm user = { user }/>
            </div>
            
        </div>
    );
};

export default Login;