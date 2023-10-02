import React from "react";

import "./CarouselCard.css";



const CarouselCard = (props) => {
    return (
        <div className="card-container">
            <div className="card-img">
                <img
                    className="card-img-svg"
                    src={props.imgUrl}
                    alt="card img"
                />
            </div>
            <div className="card-text">
                {props.text}
            </div>
        </div>
    );
};



export default CarouselCard;