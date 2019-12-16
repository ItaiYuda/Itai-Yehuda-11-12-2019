import {
    SEARCH_CITIES_ERROR,
    SEARCH_CITIES_SUCCESS,
    SEARCH_CITIES_PENDING,
    NULLIFY_ERRORS
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: '',
    data: [],
    cities: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_CITIES_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case SEARCH_CITIES_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case SEARCH_CITIES_SUCCESS:
            return {
                ...state,
                ...action.payload.data,
                error: '',
                isLoading: false,
                data: action.payload.data,
                cities: action.payload.cities
            };
        case NULLIFY_ERRORS:
            return {
                ...state,
                error: ''
            }
        default:
            return state;
    }
};
