import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDayInWeek, getAvgTemperature } from '../../utilis/displayHelper';
import CardDisplay from './CardDisplay';
import { Redirect } from 'react-router-dom';
import { requestCurrentCity } from '../../store/actions/actions';
import './style.scss';

const CardList = ({ isFavorites }) => {
    const { forecast } = useSelector(state => state.currentCity);
    const { favoriteCities, currentCity, propertiesDisplay } = useSelector(state => state);
    const dispatch = useDispatch();
    const [redirectToHome, setRedirectToHome] = useState(false);
    const favorites = Object.values(favoriteCities);
    const navigateToHomePage = (cityName, cityKey, country) => {

        if (currentCity.cityName !== cityName) {
            dispatch(requestCurrentCity(cityName, cityKey, country, true, true));
        }
        setRedirectToHome(true);
    }

    if (redirectToHome) {
        return <Redirect to="/" />;
    }
    return (
        <div className='card-list-container'>
            {
                isFavorites ? <ul className='card-list-deck'>
                    {
                        favorites.map(city => {
                            return <CardDisplay
                                key={city.cityKey}
                                cityKey={city.cityKey}
                                isCelsius={propertiesDisplay.isCelsius}
                                title={city.cityName}
                                subTitle={city.country}
                                temperature={Math.round(city.temperature)}
                                text={city.weatherText}
                                isFavorites={isFavorites}
                                navigateToHomePage={navigateToHomePage}
                                isLight={propertiesDisplay.isLight}
                            />
                        })
                    }
                </ul> :
                    <ul className='card-list-deck'>{forecast.map((dailyForecast, index) => {
                        return <CardDisplay
                            key={index}
                            isCelsius={propertiesDisplay.isCelsius}
                            title={getDayInWeek(dailyForecast.EpochDate)}
                            subTitle=''
                            temperature={getAvgTemperature(dailyForecast.Temperature.Maximum.Value, dailyForecast.Temperature.Minimum.Value)}
                            text={dailyForecast.Day.Icon}
                            isFavorites={isFavorites}
                            isLight={propertiesDisplay.isLight}
                        />
                    })}</ul>
            }
        </div>

    )
}

export default CardList
