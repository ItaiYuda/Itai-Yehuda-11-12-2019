import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToFahrenheit } from '../../../../utilis/displayHelper';
import notinfav from '../../../../utilis/images/notinfav.png';
import infav from '../../../../utilis/images/infav.png';
import CardList from '../../../../components/CardList/index';
import Loading from '../../../../components/Loading/index';
import * as symbols from '../../../../config/symbols';
import { toggleFavoriteCities, nullifyErrors } from '../../../../store/actions/actions';
import ModalMessage from '../../../../components/ModalMessage';
import './style.scss';

const Main = () => {
    const state = useSelector(state => state);
    const { currentCity, favoriteCities, propertiesDisplay } = state;

    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const [modalActivated, setModalActivated] = useState(true);
    const toggleFavorites = () => {

        dispatch(toggleFavoriteCities(currentCity, favoriteCities));
    }


    const handleCloseError = () => {
        setShowError(false);
        setModalActivated(true);
        dispatch(nullifyErrors());
    }

    if (currentCity.isLoading === true) {
        return <Loading />

    }
    if (currentCity.error !== '' && modalActivated) {
        setModalActivated(false);
        setShowError(true);
    }
    return (
        <div className='main-page'>
            <div className='main-city-details'>
                <div>
                    <div>
                        <img src={`https://www.accuweather.com/images/weathericons/${currentCity.weatherIcon}.svg`} alt={'weather temperature'} />
                    </div>
                    <div className='city-name'>

                        <h1>{currentCity.cityName}</h1>
                        <h5> {currentCity.country}</h5>


                        {propertiesDisplay.isCelsius ?
                            <div>
                                {Math.round(currentCity.temperature)} <label>{symbols.celsiusSymbol}</label>
                            </div>
                            : <div>
                                {convertToFahrenheit(currentCity.temperature)} <label>{symbols.fahrenheitSymbol}</label>
                            </div>
                        }
                    </div>
                </div>
                <div className='favorite-img'>
                    <img className='img-fav' src={currentCity.inFavorite ? infav : notinfav} alt='add to favorite' onClick={toggleFavorites} />
                </div>
            </div>
            <div className='main-text'>
                {currentCity.weatherText}
            </div>
            <CardList />
            <ModalMessage
                error={currentCity.error}
                show={showError}
                handleClose={handleCloseError}
            />

        </div>
    )
}

export default Main;
