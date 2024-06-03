/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../styles.css'

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });

    });

    return (
        <nav className="navbar mb-5 is-success is-spaced " role="navigation" aria-label="main navigation" id="test123">
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
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/login" className="login-button button is-rounded" onClick={() => setIsActive(false)}>
                                <strong>Einloggen</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;