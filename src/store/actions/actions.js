import * as actionTypes from './actionTypes';
import axios from 'axios';

//	! PbEjenHDwKLdF8HX35C3vl2RqkW12RgH landy
// ? 1PPTgllut0ucEAnOJ80r8ms5qn3fItAs Itai
// ! rtNwhta5SWhygDRcYgBoSW22WOUgWuG7 xai
//? 	A1H3tiOBUIk8wIbcDC4H2BGgUtOYPEda Hasani

const API_KEY = `PbEjenHDwKLdF8HX35C3vl2RqkW12RgH`;
const CORS_ORIGIN = `https://cors-anywhere.herokuapp.com/`;

export const requestSearchCities = query => {
    return async dispatch => {
        dispatch(searchCitiesPending());
        const SEARCH_URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;
        try {
            const response = await axios.get(`${CORS_ORIGIN}${SEARCH_URL}`)
            const cities = response.data.map(city => city.LocalizedName);
            dispatch(searchCitiesSuccess(response.data, cities));

        }
        catch (error) {
            dispatch(searchCitiesError(error.response.data.Message));
        }

    };
};

const searchCitiesError = (error) => {
    return {
        type: actionTypes.SEARCH_CITIES_ERROR,
        payload: {
            error
        }
    };
};

const searchCitiesSuccess = (data, cities) => {
    return {
        type: actionTypes.SEARCH_CITIES_SUCCESS,
        payload: {
            data,
            cities
        }
    };
};

const searchCitiesPending = () => {
    return {
        type: actionTypes.SEARCH_CITIES_PENDING
    };
};

export const requestCurrentCity = (cityName, cityKey, country, inFavorite = false, init = false) => {
    return async (dispatch, getState) => {
        dispatch(requestCurrentCityPending());

        if (!init) {
            const city = getState().search.data.filter(city => {
                if (city.LocalizedName === cityName)
                    return city;
            });
            cityKey = city[0].Key;
            country = city[0].Country.LocalizedName;
        }
        inFavorite = cityKey in getState().favoriteCities;
        const CURRENT_CITY_URL = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
        const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`;
        try {
            const [currentRes, forecastRes] = await axios.all([
                axios.get(`${CORS_ORIGIN}${CURRENT_CITY_URL}`),
                axios.get(`${CORS_ORIGIN}${FORECAST_URL}`)
            ]);
            const currentCity = currentRes.data[0];
            const forecast = forecastRes.data;
            localStorage.setItem('currentCity', JSON.stringify({ cityKey, cityName, country }));
            dispatch(requestCurrentCitySuccess(cityKey, cityName, country, inFavorite, currentCity.WeatherText, currentCity.WeatherIcon, currentCity.Temperature.Metric.Value, forecast.DailyForecasts));

        }
        catch (error) {
            dispatch(requestCurrentCityError(error.response.data.Message));
        }
    }
}


const requestCurrentCityPending = () => {
    return {
        type: actionTypes.REQUEST_CURRENT_CITY_PENDING
    }
}
const requestCurrentCitySuccess = (cityKey, cityName, country, inFavorite, weatherText, weatherIcon, temperature, forecast) => {
    return {
        type: actionTypes.REQUEST_CURRENT_CITY_SUCCESS,
        payload: {
            cityKey,
            cityName,
            weatherIcon,
            weatherText,
            temperature,
            country,
            inFavorite,
            forecast
        }
    }
}
const requestCurrentCityError = (error) => {
    return {
        type: actionTypes.REQUEST_CURRENT_CITY_ERROR,
        payload: {
            error
        }
    }
}

export const toggleFavoriteCities = (mainCity, favoriteCities) => {
    return (dispatch, getState) => {
        const favoriteInLocal = JSON.parse(localStorage.getItem('favoriteCities')) || {};

        let inFavorite;
        if (!(mainCity.cityKey in getState().favoriteCities)) {
            inFavorite = true;

            favoriteInLocal[mainCity.cityKey] = {
                cityKey: mainCity.cityKey,
                country: mainCity.country,
                cityName: mainCity.cityName,
                temperature: mainCity.temperature,
                weatherText: mainCity.weatherText
            };

        }
        else {
            inFavorite = false;
            delete favoriteInLocal[mainCity.cityKey];
        }
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteInLocal));
        dispatch(toggleFavorites(inFavorite));
        dispatch(addOrRemoveFavorites(favoriteInLocal));
    }
}

const addOrRemoveFavorites = (favoriteCities) => {
    return {
        type: actionTypes.ADD_OR_REMOVE_FAVORITES,
        payload: {
            favoriteCities
        }
    }
}

const toggleFavorites = (inFavorite) => {
    return {
        type: actionTypes.TOGGLE_FAVORITES,
        payload: {
            inFavorite
        }
    }
}


export const initState = (cityName, cityKey, country, inFavorite = false, init = true) => {
    return async dispatch => {
        const cityFromLocal = JSON.parse(localStorage.getItem('currentCity')) || null;
        const favoriteInLocal = JSON.parse(localStorage.getItem('favoriteCities')) || null;
        if (favoriteInLocal !== null) {
            await dispatch(addOrRemoveFavorites(favoriteInLocal));
        }

        if (cityFromLocal !== null) {
            cityName = cityFromLocal.cityName;
            cityKey = cityFromLocal.cityKey;
            country = cityFromLocal.country;
        }
        dispatch(requestCurrentCity(cityName, cityKey, country, inFavorite, init));

    }

}

export const toggleSymbol = (symbol) => {
    return dispatch => {

        dispatch(ToggleSCelsiusFahrenheit(!symbol));
    }
}

const ToggleSCelsiusFahrenheit = (symbol) => {
    return {
        type: actionTypes.TOGGLE_CELSIUS_FAHRENHEIT,
        payload: {
            isCelsius: symbol
        }
    }
}

export const toggleTheme = (theme) => {
    return dispatch => {
        dispatch(toggleDarkLightTheme(!theme))
    }
}

const toggleDarkLightTheme = (theme) => {
    return {
        type: actionTypes.TOGGLE_DARK_LIGHT_THEME,
        payload: {
            isLight: theme
        }
    }
}

export const nullifyErrors = () => {
    return dispatch => {
        return dispatch({
            type: actionTypes.NULLIFY_ERRORS
        })
    }
}