import React from 'react';
import { convertToFahrenheit } from '../../../utilis/displayHelper';
import * as symbols from '../../../config/symbols';

const CardDisplay = (props) => {
    const { title, subTitle, temperature, text, isFavorites, isCelsius, cityKey, isLight } = props;

    const navigateToHomePage = (title) => {
        props.navigateToHomePage(title, cityKey, subTitle);
    }
    return (
        <li className={isLight ? '' : 'dark-card'} onClick={isFavorites ? () => navigateToHomePage(title) : null}>
            <strong>{title}</strong>
            {subTitle === '' ? null : <h5>{subTitle}</h5>}
            <hr />
            <div>
                {isCelsius ?
                    <div>{temperature} <label>{symbols.celsiusSymbol}</label></div>
                    : <div>{convertToFahrenheit(temperature)} <label>{symbols.fahrenheitSymbol}</label></div>
                }
                <div>{isFavorites ? text : <img className='img-weather' src={`https://www.accuweather.com/images/weathericons/${text}.svg`} alt={'weather temperature'} />}</div>
            </div>
        </li>
    )
}

export default CardDisplay;