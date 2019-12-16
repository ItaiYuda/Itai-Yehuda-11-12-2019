import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSymbol, toggleTheme } from '../../store/actions/actions';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import light_theme from '../../utilis/images/light.png';
import darkTheme from '../../utilis/images/dark.png';
import celsius from '../../utilis/images/celsius1.png';
import fahrenheit from '../../utilis/images/fahrenheit.png';

import './style.scss';

const NavBar = () => {
    const dispatch = useDispatch();
    const { isCelsius, isLight } = useSelector(state => state.propertiesDisplay)
    const toggleSymbols = () => {
        dispatch(toggleSymbol(isCelsius));
    }
    const toggleThemes = () => {
        dispatch(toggleTheme(isLight));
    }

    return (
        <div className='nav-bar' style={{ backgroundColor: '#A434E4' }}>
            <h1><Link to='/'>Herolo Weather App</Link></h1>
            <ul>
                <li>
                    <label>Dark</label>
                    <label>
                        <Toggle
                            defaultChecked={isLight}
                            icons={{
                                checked: <img src={light_theme} alt="light" className="img-fluid" style={{ color: 'white' }} />,
                                unchecked: <img src={darkTheme} alt="dark" className="img-fluid" />,
                            }}
                            onChange={toggleThemes} />
                    </label>
                    <label>Light</label>
                </li>
                <li>
                    <label>
                        <Toggle
                            defaultChecked={isCelsius}
                            icons={{
                                checked: <img src={celsius} alt="light" className="img-fluid" style={{ color: 'white' }} />,
                                unchecked: <img src={fahrenheit} alt="dark" className="img-fluid" />,
                            }}
                            onChange={toggleSymbols} />
                    </label>

                </li>
            </ul>
            <ul className='nav-bar-buttons'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/favorites'>Favorites</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
