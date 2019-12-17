import {
    REQUEST_CURRENT_CITY_ERROR,
    REQUEST_CURRENT_CITY_SUCCESS,
    REQUEST_CURRENT_CITY_PENDING,
    TOGGLE_FAVORITES,
    NULLIFY_ERRORS
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: '',
    weatherText: '',
    weatherIcon: '',
    country: '',
    cityKey: '',
    cityName: '',
    temperature: 0,
    inFavorite: false,
    forecast: []
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_CURRENT_CITY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case REQUEST_CURRENT_CITY_PENDING:
            return { ...state, isLoading: true }
        case REQUEST_CURRENT_CITY_SUCCESS:
            const cityDetails = action.payload;
            return {
                ...state,
                ...cityDetails,
                error: '',
                isLoading: false,
                weatherText: cityDetails.weatherText,
                weatherIcon: cityDetails.weatherIcon,
                cityKey: cityDetails.cityKey,
                cityName: cityDetails.cityName,
                temperature: cityDetails.temperature,
                country: cityDetails.country,
                inFavorite: action.payload.inFavorite,
                forecast: action.payload.forecast
            }
        case TOGGLE_FAVORITES:
            return {
                ...state,
                inFavorite: action.payload.inFavorite
            }
        case NULLIFY_ERRORS:
            return {
                ...state,
                error: ''
            }
        default:
            return state;
    }
}