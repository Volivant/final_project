import React from "react";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./UserPanel.css";


import UserAvatar from "../img/avatar-boy-svgrepo-com.svg"

const UserPanel = ({ user }) => {
    const { userName, isAuth, usedCompanyCount, companyLimit, loadingUser } = user;

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const logoutUser = () => {
        dispatch(userLogout(false));
        navigate("/");
    }

    return (
        <div className = {(isAuth) ? "panel-container" : "hidden-panel"}>
            
            <div className="panel-info-loader">
                {loadingUser ? (
                        <Loader className="panel-info-loader-element" />
                    ):(
                        <div  className="panel-info">
                            <div className="panel-info-text">
                                Использовано компаний
                            </div>
                            <div className="panel-info-count">
                                {usedCompanyCount}
                            </div>
                            <div className="panel-info-text">
                                Лимит по компаниям
                            </div>
                            <div className="panel-info-limit">
                                {companyLimit}
                            </div>
                        </div>
                    )}
            </div>
            <div className="panel-user">
                <p className="user-name">{userName}</p>
                <button 
                    className="btn-logout"
                    onClick={ () => logoutUser() }
                >
                    Выйти
                </button>
                <img
                        className="user-avatar"
                        src={UserAvatar}
                        alt="img"
                />
            </div>
            
        </div>
    );
};



export default UserPanel;