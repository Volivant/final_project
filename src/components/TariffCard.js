import React from "react";
import PropTypes from "prop-types";

import BaseBtn from "./BaseBtn";

import "./TariffCard.css";

import BeginnerImg from "./img/tariff_beginner.svg";
import ProImg from "./img/tariff_pro.svg";
import BusinessImg from "./img/tariff_business.svg";




const TariffCard = ({typeCard, active}) => {
    let classCardHeader = "tariff-card-header card-beginner";
    let textCardHeader = "Для небольшого исследования";
    let imgUrl = {BeginnerImg};
    let textCardPriceLow = "799 ₽";
    let textCardPriceHigh = "1200 ₽";
    let textCardPriceMonth = "или 150 ₽/мес. при рассрочке на 24 мес.";
    let tariffDetailList1 = "Безлимитная история запросов";
    let tariffDetailList2 = "Безопасная сделка";
    let tariffDetailList3 = "Поддержка 24/7";

    const activeCardCurrent = (active) ? "tariff-card-current" : "tariff-card-current not-visisble";
    const activeCardCurrentBtn = (active) ? "base-btn current-btn" : "base-btn";

    switch (typeCard) {
        case "Beginner":
            classCardHeader = "tariff-card-header card-beginner";
            textCardHeader = "Для небольшого исследования";
            imgUrl = BeginnerImg;
            textCardPriceLow = "799 ₽";
            textCardPriceHigh = "1 200 ₽";
            textCardPriceMonth = "или 150 ₽/мес. при рассрочке на 24 мес.";
            tariffDetailList1 = "Безлимитная история запросов";
            tariffDetailList2 = "Безопасная сделка";
            tariffDetailList3 = "Поддержка 24/7";
            break;
        case "Pro":
            classCardHeader = "tariff-card-header card-pro";
            textCardHeader = "Для HR и фрилансеров";
            imgUrl = ProImg;
            textCardPriceLow = "1 299 ₽";
            textCardPriceHigh = "2 600 ₽";
            textCardPriceMonth = "или 279 ₽/мес. при рассрочке на 24 мес.";
            tariffDetailList1 = "Все пункты тарифа Beginner";
            tariffDetailList2 = "Экспорт истории";
            tariffDetailList3 = "Рекомендации по приоритетам";
            break;
        case "Business":
            classCardHeader = "tariff-card-header card-business";
            textCardHeader = "Для корпоративных клиентов";
            imgUrl = BusinessImg;
            textCardPriceLow = "2 379 ₽";
            textCardPriceHigh = "3 700 ₽";
            textCardPriceMonth = "";
            tariffDetailList1 = "Все пункты тарифа Pro";
            tariffDetailList2 = "Безлимитное количество запросов";
            tariffDetailList3 = "Приоритетная поддержка";
            break;
        default:
            break;
    }
    
    return (
        <div className="tariff-card-container">
            <div className={classCardHeader}>
                <div className="tariff-card-header-title">{typeCard}</div>
                <div className="tariff-card-header-text">{textCardHeader}</div>
                <div className="tariff-card-header-img">
                    <img
                        className="tariff-card-header-img-svg"
                        src={imgUrl}
                        alt="img"
                    />
                </div>
            </div>
            <div className={activeCardCurrent}>
                <div className="tariff-card-current-active">
                    Текущий тариф
                </div>
            </div>
            <div className="tariff-card-price">
                <div className="tariff-card-price-low">
                    {textCardPriceLow}
                </div>
                <div className="tariff-card-price-high">
                    {textCardPriceHigh}
                </div>
                <div className="tariff-card-price-month">
                    {textCardPriceMonth}
                </div>
            </div>
            <div className="tariff-detail">
                <div className="tariff-detail-title">
                    В тариф входит:
                </div>
                <div className="tariff-detail-list">
                    <ul>
                        <li>{tariffDetailList1}</li>
                        <li>{tariffDetailList2}</li>
                        <li>{tariffDetailList3}</li>
                    </ul>
                </div>
            </div>
            <div className="tariff-btn">
                <BaseBtn className={activeCardCurrentBtn}>{(active) ? "Перейти в личный кабинет" : "Подробнее"}</BaseBtn>
            </div>
            
        </div>
    );
};

TariffCard.propTypes = {
    typeCard: PropTypes.string,
    active: PropTypes.bool,
};

TariffCard.defaultProps = {
    typeCard: 'Beginner',
    active: false,
};

export default TariffCard;