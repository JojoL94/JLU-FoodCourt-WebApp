/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles.css'
import axios from 'axios';
import { useAuth } from '../hooks';

const AdminNavbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { setToken } = useAuth()

    const Logout = async () => {
        try {
            await axios.delete('/api/auth/logout');
            setToken('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar mb-5 is-success is-spaced " role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="logo navbar-item">
                    <img src={logo} alt="Food Court Logo" />
                </Link>

                <a onClick={() => { setIsActive(!isActive) }} role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start ml-4">
                    <Link to="/menu" className="navbar-item" onClick={() => setIsActive(false)}>
                        Speisekarte
                    </Link>

                    <Link to="/events/guest" className="navbar-item" onClick={() => setIsActive(false)}>
                        Events
                    </Link>

                    <Link to="#" className="navbar-item" onClick={() => setIsActive(false)}>
                        Meine Auswahl
                    </Link>

                    <Link to="/contact" className="navbar-item" onClick={() => setIsActive(false)}>
                        Kontakt
                    </Link>

                    <div onClick={() => { setIsExpanded(!isExpanded) }} className={`navbar-item has-dropdown ${isExpanded ? 'is-active' : ''}`}>
                        <a className="navbar-link">
                            Verwaltung
                        </a>

                        <div className="navbar-dropdown">
                            <Link to="/administrators" className="navbar-item" onClick={() => setIsExpanded(false)}>
                                Verwaltung Administratoren
                            </Link>
                            <Link to="/restaurantowners" className="navbar-item" onClick={() => setIsExpanded(false)}>
                                Verwaltung Restaurantbetreiber
                            </Link>
                            <Link to="/menu/administration" className="navbar-item" onClick={() => setIsExpanded(false)}>
                                Verwaltung Speisekarte
                            </Link>
                            <Link to="/events/administration" className="navbar-item" onClick={() => setIsExpanded(false)}>
                                Verwaltung Events
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <div onClick={Logout} className="login-button button is-rounded">
                                <strong>Ausloggen</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default AdminNavbar;