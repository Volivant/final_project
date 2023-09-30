import React, { Component } from "react";
import Slider from "react-slick";

import "./SearchResultCarousel.css";
import SearchResultCarouselCard from "./SearchResultCarouselCard";

function loadCardData(isReport) {
    if (isReport) {
        const searchDoc = JSON.parse(localStorage.getItem('histogram'));
        let dataCard = [];
        if (searchDoc.data[0].data.length > 0) {
            for (let i=0; i <= searchDoc.data[0].data.length - 1; i++) {
                const dateCard = searchDoc.data[0].data[i].date;
                dataCard.push({
                    'key': i, 
                    'date': dateCard.substr(0, 10),
                    'doc': searchDoc.data[0].data[i].value,
                    'risk': searchDoc.data[1].data[i].value
                });
            }
        }
        // console.log(dataCard);
        return dataCard;
    }
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style,
            // left: "-185px" 
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
        style={{ ...style,
            right: "-35px" 
        }}
        onClick={onClick}
      />
    );
}

export default class SearchResultCarousel extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: this.props.slides,
            // slidesToScroll: this.props.slides,
            // slidesToShow: 7,
            slidesToScroll: 1,
            prevArrow: <SamplePrevArrow />,
            nextArrow: <SampleNextArrow />,
        };
        const cardData = loadCardData(this.props.user.isReport);
        
        let card;
            if (this.props.user.isReport) {
                card = cardData.map(item => (
                            <div>
                                <SearchResultCarouselCard 
                                    key = {item.key}
                                    date = {item.date} 
                                    doc = {item.doc} 
                                    risk = {item.risk}
                                />
                            </div>
                        ));                
            } else {
            
        }


        return (
            <div className="search-result-slider-container">
                <Slider {...settings}>
                    
                    {card}
                </Slider>
            </div>
        );
    }
  }