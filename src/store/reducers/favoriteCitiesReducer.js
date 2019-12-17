import { ADD_OR_REMOVE_FAVORITES } from '../actions/actionTypes';


export default (state = {}, action = {}) => {
    switch (action.type) {
        case ADD_OR_REMOVE_FAVORITES:
            return {
                ...action.payload.favoriteCities
            }
        default:
            return state;
    }
}