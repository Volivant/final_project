import React, { useState } from "react";

import BaseBtn from "./BaseBtn";

import "./Search.css";
import imgDoc from './img/document.svg';
import imgFolder from './img/folders.svg';
import imgRocket from './img/rocket.svg';

import { setSearchConfig } from '../store/actions/dataActions';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = ({ user }) => {
    const [inputInn, setInputInn] = useState('');
    const [inputTon, setInputTon] = useState('any');
    const [inputDoc, setInputDoc] = useState('');
    const [inputRangeFrom, setInputRangeFrom] = useState('');
    const [inputRangeTo, setInputRangeTo] = useState('');
    const [checkFull, setCheckFull] = useState(true);
    const [checkBusiness, setCheckBusiness] = useState(true);
    const [checkRole, setCheckRole] = useState(true);
    const [checkRisk, setCheckRisk] = useState(false);
    const [checkTech, setCheckTech] = useState(false);
    const [checkAnons, setCheckAnons] = useState(true);
    const [checkReport, setCheckReport] = useState(false);

    const onDateFocus = (e) => (e.target.type = "date");
    const onDateBlur = (e) => (e.target.type = "text");
    
    const validityData = (document.querySelector(':invalid') == null) ? false : true;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  dataReportPublications = async () => {
        
        await dispatch(setSearchConfig(
            {inputInn, 
            inputTon,
            inputDoc, 
            inputRangeFrom, 
            inputRangeTo, 
            checkFull, 
            checkRole,
            checkRisk,
            checkTech,
            checkAnons,
            checkReport}
        ));
        navigate("/search-result");
    }

    return (
        <div className="search-container">
            <h2 className="search-title">Найдите необходимые <br /> данные в пару кликов.</h2>
            <p className="search-text">Задайте параметры поиска.<br /> Чем больше заполните, тем точнее поиск</p>
            <div className="search-form">
                <label>
                    <div  className="search-label-input">ИНН компании*</div>
                    <input 
                        className="search-input search-input-inn" 
                        type="number"
                        name = "inputInn" 
                        placeholder="10 цифр"
                        value={inputInn}
                        onChange={(e) => setInputInn(e.target.value)}
                        required 
                        pattern="[0-9]{10,10}"
                        min="1000000000" max="9999999999" step="1"
                    />
                </label>
                <label>
                    <div  className="search-label-input">Тональность</div>
                    <select 
                        className="search-input search-input-ton" 
                        name = "inputTon" 
                        size="1"
                        value={inputTon}
                        onChange={(e) => setInputTon(e.target.value)}>
                        <option selected value="any">Любая</option>
                        <option value="negative">Негативная</option>
                        <option value="neutral">Нейтральная</option>
                        <option value="positive">Позитивная</option>
                    </select>
                </label>
                <label>
                    <div  className="search-label-input">Количество документов в выдаче*</div>
                    <input 
                        className="search-input search-input-doc" 
                        type="number"
                        name = "inputDoc" 
                        placeholder="От 1 до 1000"
                        value={inputDoc}
                        onChange={(e) => setInputDoc(e.target.value)}
                        required 
                        pattern="[0-9]{1,4}"
                    />
                </label>
                <label>
                    <div  className="search-label-input">Диапазон поиска*</div>
                    <input 
                        className="search-input search-input-range" 
                        type="text"
                        name = "inputRangeFrom" 
                        placeholder="Дата начала"
                        value={inputRangeFrom}
                        onChange={(e) => setInputRangeFrom(e.target.value)}
                        onFocus={onDateFocus}
                        onBlur={onDateBlur}
                        required
                    />
                    <input 
                        className="search-input search-input-range" 
                        type="text"
                        name = "inputRangeTo" 
                        placeholder="Дата конца"
                        value={inputRangeTo}
                        onChange={(e) => setInputRangeTo(e.target.value)}
                        onFocus={onDateFocus}
                        onBlur={onDateBlur}
                        required
                    />
                </label>
                <div className="search-check-container">
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-full" 
                            type="checkbox"
                            name = "checkFull" 
                            checked={checkFull}
                            onChange={(e) => setCheckFull(e.target.checked)}
                        />
                        <span>Признак максимальной полноты</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-business" 
                            type="checkbox"
                            name = "checkBusiness" 
                            checked={checkBusiness}
                            onChange={(e) => setCheckBusiness(e.target.checked)}
                        />
                        <span>Упоминания в бизнес-контексте</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-role" 
                            type="checkbox"
                            name = "checkRole" 
                            checked={checkRole}
                            onChange={(e) => setCheckRole(e.target.checked)}
                        />
                        <span>Главная роль в публикации</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-role" 
                            type="checkbox"
                            name = "checkRisk" 
                            checked={checkRisk}
                            onChange={(e) => setCheckRisk(e.target.checked)}
                        />
                        <span>Публикации только с риск-факторами</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-role" 
                            type="checkbox"
                            name = "checkTech" 
                            checked={checkTech}
                            onChange={(e) => setCheckTech(e.target.checked)}
                        />
                        <span>Включать технические новости рынков</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-role" 
                            type="checkbox"
                            name = "checkAnons" 
                            checked={checkAnons}
                            onChange={(e) => setCheckAnons(e.target.checked)}
                        />
                        <span>Включать анонсы и календари</span>
                    </label>
                    <label className="search-check-label">
                        <input 
                            className="search-check search-check-role" 
                            type="checkbox"
                            name = "checkReport" 
                            checked={checkReport}
                            onChange={(e) => setCheckReport(e.target.checked)}
                        />
                        <span>Включать сводки новостей</span>
                    </label>
                </div>
                
                <BaseBtn 
                    className="search-btn" 
                    disabled={validityData} 
                    onClick={ () => dataReportPublications() }
                    >Поиск
                </BaseBtn>
                <p className="search-remark">* Обязательные к заполнению поля</p>
            </div>
            <img className="search-img-doc" src = {imgDoc} alt="doc" />
            <img className="search-img-folder" src = {imgFolder} alt="folder" />
            <img className="search-img-rocket" src = {imgRocket} alt="rocket" />
        </div>
    );
};

export default Search;