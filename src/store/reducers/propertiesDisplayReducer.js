import { TOGGLE_CELSIUS_FAHRENHEIT, TOGGLE_DARK_LIGHT_THEME } from '../actions/actionTypes';

const initialState = {
    isCelsius: true,
    isLight: true
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_CELSIUS_FAHRENHEIT:

            return {
                ...state,
                isCelsius: action.payload.isCelsius
            }
        case TOGGLE_DARK_LIGHT_THEME:
            return {
                ...state,
                isLight: action.payload.isLight
            }
        default:
            return state;
    }
}