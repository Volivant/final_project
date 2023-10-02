import React from "react";

import "./SearchResultCarouselCard.css";



const SearchResultCarouselCard = (props) => {
    return (
        <div className="search-result-card-container">
            <div className="search-result-card-date">
                {props.date}
            </div>
            <div className="search-result-card-doc">
                {props.doc}
            </div>
            <div className="search-result-card-risk">
                {props.risk}
            </div>
        </div>
        
    );
};



export default SearchResultCarouselCard;