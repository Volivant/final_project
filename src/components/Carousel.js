import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CarouselCard from "./CarouselCard";
import CardImgSpeed from "./img/carusel_speed.svg";
import CardImgBase from "./img/carusel_base.svg";
import CardImgGuard from "./img/carusel_guard.svg";

import "./Carousel.css";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{
            ...style, 
            left: "-45px"
            // background: 'url("./icons/icon_left_btn.svg") center no-repeat'
        }}
        onClick={onClick}
        />
    );
}
  
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
    <div
        className={className}
        style={{ 
            ...style, 
            right: "-45px"
            // background: 'url("./icons/icon_right_btn.svg") center no-repeat' 
        }}
        onClick={onClick}
    />
    );
}

export default class Carousel extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: this.props.slides,
            slidesToScroll: 1,
            prevArrow: <SamplePrevArrow />,
            nextArrow: <SampleNextArrow />,
        };
        return (
            <div className="slider-conteiner">
                <Slider {...settings}>
                    <div>
                        <CarouselCard 
                            imgUrl = {CardImgSpeed} 
                            text = "Высокая и оперативная скорость обработки заявки" 
                        />
                    </div>
                    <div>
                        <CarouselCard 
                            imgUrl = {CardImgBase} 
                            text = "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос" 
                        />
                    </div>
                    <div>
                        <CarouselCard 
                            imgUrl = {CardImgGuard} 
                            text = "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству" 
                        />
                    </div>
                    <div>
                        <CarouselCard 
                            imgUrl = {CardImgSpeed} 
                            text = "Еще что-нибудь" 
                        />
                    </div>
                    <div>
                        <CarouselCard 
                            imgUrl = {CardImgGuard} 
                            text = "И еще немного" 
                        />
                    </div>
                </Slider>
            </div>
        );
    }
  }
  