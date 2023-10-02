import React from "react";
import BaseBtn from "../../BaseBtn/BaseBtn";
import "./SearchResultDocCard.css";



const SearchResultDocCard = (props) => {
    

    return (
        <div className="search-result-doc-card-container">
            <div className="search-result-doc-card-date">
                {props.date}
            </div>
            <div className="search-result-doc-card-source">
                {props.source}
            </div>
            <div className="search-result-doc-card-title">
                {props.title}
            </div>
            <div className="search-result-doc-card-type">
                {props.type}
            </div>
            {props.img !== "" ? (
                <div >
                    <img className="search-result-doc-card-img" src = {props.img} alt="" />
                </div>
            ):""}
            
            <div className="search-result-doc-card-text">
                {props.text}
                
            </div>
            <div className="search-result-doc-card-footer">
                <BaseBtn 
                    className="search-result-doc-card-btn" 
                    // onClick={ () => getTotalDoc() }
                    active={true}
                    >Читать в источнике
                </BaseBtn>
                <div className="search-result-doc-card-statistics">
                    {props.statistics} слова
                </div>
            </div>
        </div>
        
    );
};



export default SearchResultDocCard;