import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as MobMenu} from "../icons/m_menu.svg"
import { ReactComponent as MobClose} from "../icons/m_x.svg"
import { ReactComponent as LogoBig } from "../img/logo_big.svg";
import { ReactComponent as LogoFooterBig } from "../img/logo_footer_big.svg";
import './Navbar.css'

import UserPanel from "./UserPanel";

const Navbar = ({ user }) => {
    const [open, setOpen] = useState(false); //открыты или закрыты ссылки на панели навигации в мобильном представлении
	const { isAuth } = user;

    const handleClick = () => {
		setOpen(!open);
	};

    const closeMenu = () => {
		setOpen(false);
	};

    return (
		<nav className = {open ? 'navbar active' : 'navbar'}>
			<Link to="/" className="nav-logo">
                {open ? <LogoFooterBig /> : <LogoBig />}
			</Link>
			
			<ul className={open ? 'nav-links active' : 'nav-links'}>
				<li className="nav-item">
					<Link to="/" className="nav-link" onClick={closeMenu}>
						Главная
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/tariffs" className="nav-link" onClick={closeMenu}>
						Тарифы
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/faq" className="nav-link" onClick={closeMenu}>
						FAQ
					</Link>
				</li>
				<li className="nav-item">
					<button className={isAuth ? "btn btn__logout" : "hidden-btn"}>Выйти</button>
				</li>
				<Link to="/register" onClick={closeMenu}>
					<button className={isAuth ? "hidden-btn" : "btn"} disabled = {true}>Зарегистрироваться</button>
				</Link>
				<Link to="/login" onClick={closeMenu}>
					<button className={isAuth ? "hidden-btn" : "btn btn__login"}>Войти</button>
				</Link>
			</ul>
			<UserPanel className="user-panel" user = { user }/>
			<div onClick={handleClick} className="nav-icon">
				{open ? <MobClose /> : <MobMenu />}
			</div>
		</nav>
	);
};

export default Navbar;