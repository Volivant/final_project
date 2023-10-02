import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import BaseBtn from "../BaseBtn/BaseBtn";
import Carousel from "./Carousel/Carousel"
import TariffCard from "./TariffCard";

import imgHomeFirst from '../img/home1.svg';
import imgHomeSecond from '../img/home2.svg';
import imgHomeThird from '../img/home3.svg';

import "./home.css";

// import { connect } from "react-redux";

const Home = ({ user }) => {
    let slidesCount = 3;
    const { isAuth } = user;
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
 
        window.addEventListener('resize', handleResize);
    
        // Очищаем слушатель событий при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    slidesCount = (width <= 768) ? 1 : 3;
    
    return (
        <div>
            <div className="home-title">
                <h1>сервис по поиску публикаций <br />о компании <br />по его ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных <br />в формате PDF на электронную почту.</p>
                <BaseBtn 
                    className={(isAuth) ? "request-btn" : "hidden-btn"}
                    onClick={ () => navigate("/search") }>
                    Запросить данные
                </BaseBtn>
                <img className="request-img" src = {imgHomeFirst} alt="home1" />
            </div>
            <div className="main-carousel-container">
                <h2>Почему именно мы</h2>
                <div className="carousel-container">
                    <Carousel user = { user } slides = {slidesCount} />
                </div>
                <div className="carousel-block-img">
                    <img className="carousel-img2" src = {imgHomeSecond} alt="home2" />
                    <img className="carousel-img3" src = {imgHomeThird} alt="home3" />
                </div>
            </div>
            <div className="main-tariff-container">
                <h2>наши тарифы</h2>
                <div className="tariff-container">
                    <TariffCard typeCard = "Beginner" active/>
                    <TariffCard typeCard = "Pro"/>
                    <TariffCard typeCard = "Business"/>
                </div>
            </div>
        </div>
    );
};

export default Home;