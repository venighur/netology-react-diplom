import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../img/header-logo.png';

function Header() {
  const navigate = useNavigate();

  const setActive = (isActive: boolean) => {
    return `nav-link ${isActive ? 'active' : ''}`;
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => setActive(isActive)} to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => setActive(isActive)} to="/catalog">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => setActive(isActive)} to="/about">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => setActive(isActive)} to="/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
                    <div className={`header-controls-cart${localStorage.length && '-full'}`}>
                      {localStorage.length > 0 ? localStorage.length : ''}
                    </div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
