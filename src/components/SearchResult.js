import React, { useState, useEffect } from "react";

import BaseBtn from "./BaseBtn";
import Loader from "./Loader";
import SearchResultDocCard from "./SearchResultDocCard";
import imgSearchResult from "./img/search-result-img.svg";

import "./SearchResult.css";

import SearchResultCarousel from "./SearchResultCarousel";
import { useDispatch } from "react-redux";
import { loadReportPublications, loadDocuments } from '../store/actions/dataActions';

const SearchResult = ({ user }) => {
    const dispatch = useDispatch();
    const  dataReportPublications = async () => {
        await dispatch(loadReportPublications(
            user.searchConfig.inputInn, 
            user.searchConfig.inputTon,
            user.searchConfig.inputDoc, 
            user.searchConfig.inputRangeFrom, 
            user.searchConfig.inputRangeTo, 
            user.searchConfig.checkFull, 
            user.searchConfig.checkRole,
            user.searchConfig.checkRisk,
            user.searchConfig.checkTech,
            user.searchConfig.checkAnons,
            user.searchConfig.checkReport
        ));
        await dispatch(loadDocuments());
    }

    useEffect(() => {
        dataReportPublications();
    }, []);

    const [countCard, setCountCard] = useState(2);
    const getTotalDoc = () => {
        let totalDoc = 0;
        if (user.isReport) {
            const searchDoc = JSON.parse(localStorage.getItem('histogram'));
            if (searchDoc.data[0].data.length > 0) {
                for (let i=0; i <= searchDoc.data[0].data.length - 1; i++) {
                    totalDoc += searchDoc.data[0].data[i].value;
                }
            }
        }
        return totalDoc;
    }

    const totalDoc = getTotalDoc();
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // Очищаем слушатель событий при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let slidesCount = 3;
    slidesCount = (width <= 500) ? 1 : 4;

    

    const searchImg = (xmlStr) => {
        let startPos = xmlStr.indexOf("<img", 0);
        let endPos = 0;
        if (startPos !== -1) {
            endPos = xmlStr.indexOf(">", startPos);
            const imgShablon = xmlStr.substring(startPos+10, endPos-1);
            return imgShablon;
        } else {
            return "";
        }
    }

    //форматирование контекста
    const getCardContext = (xmlStr) => {
        xmlStr = xmlStr.replaceAll('&lt;/p&gt;', '\n');
        xmlStr = xmlStr.replaceAll('&lt;', '<');
        xmlStr = xmlStr.replaceAll('&gt;', '>');
        let currentPos = 0; // текущая позиция поиска
        while (xmlStr.indexOf("<", currentPos) !== -1) {
            const startPos = xmlStr.indexOf("<", currentPos);
            const endPos = xmlStr.indexOf(">", currentPos);
            const delShablon = xmlStr.substring(startPos, endPos+1);
            xmlStr = xmlStr.replaceAll(delShablon, '');
        }
        return xmlStr;
    }

    const getTypeDoc = (isAnnouncement, isDigest, isTechNews) => {
        let typeDoc = "";
                if (isAnnouncement) {
                    typeDoc = "анонсы и события";       
                } else if (isDigest) {
                    typeDoc = "сводки новостей"; 
                } else if (isTechNews) {
                    typeDoc = "технические новости,"; 
                }
        return typeDoc;
    }

    

    const dataDoc = JSON.parse(localStorage.getItem('documents'));
   
    let insertCard = [];

    if (user.isDocument) {
        insertCard = dataDoc.map((item, index) => {
            return <SearchResultDocCard 
                key = {index}
                date = {item.ok.issueDate.substring(0, 10)}
                source = {item.ok.source.name}
                title = {item.ok.title.text}
                type = {getTypeDoc(item.ok.attributes.isAnnouncement,
                    item.ok.attributes.isDigest,
                    item.ok.attributes.isTechNews)}
                img = {searchImg(item.ok.content.markup)}
                text = {getCardContext(item.ok.content.markup)}
                statistics = {item.ok.attributes.wordCount}
            />
        });
    } 

    const insertCardDoc = insertCard.slice(0, countCard);

    return (
        <div className="search-result-container">
            <div className="search-result-header">
                <div className="search-result-title">
                    <h2 className="search-result-title-content">
                        Ищем. Скоро <br />будут результаты
                    </h2>
                    <p className="search-result-title-remark">
                        Поиск может занять некоторое время, <br />просим сохранять терпение.
                    </p>
                </div>
                <img className="search-result-header-img" src = {imgSearchResult} alt="search" />
            </div>
            <div className="search-result-report">
                <h3 className="search-result-report-title">
                    Общая сводка
                </h3>
                <p className="search-result-report-total">
                    Найдено {totalDoc} вариантов
                </p>
                <div className="search-result-carousel-container">
                    <div className="search-result-carousel-header">
                        <div className="search-result-carousel-header-text">Период</div>
                        <div className="search-result-carousel-header-text">Всего</div>
                        <div className="search-result-carousel-header-text">Риски</div>
                    </div>
                    <div className="search-result-carousel-main">
                        {user.loadingData ? (
                            <div className = "search-result-carousel-main-loader">
                                <Loader />
                            </div>
                        ):( 
                            <SearchResultCarousel slides = {slidesCount} user = { user } />
                        )}
                    </div>
                </div>
            </div>
            <div className="search-result-doc">
                <h2 className="search-result-doc-title">
                    Список документов
                </h2>
                <div className="search-result-doc-list">
                    {insertCardDoc}
                </div>
            </div>

            <BaseBtn 
                className="search-result-more-btn" 
                onClick={ () =>setCountCard(countCard+2) }
                >Показать больше
            </BaseBtn>
        </div>
    );
};

export default SearchResult;