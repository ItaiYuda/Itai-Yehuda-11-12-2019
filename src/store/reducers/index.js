import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import currentCityReducer from './currentCityReducer';
import favoriteCitiesReducer from './favoriteCitiesReducer';
import propertiesDisplayReducer from './propertiesDisplayReducer'

export default combineReducers({
    search: searchReducer,
    currentCity: currentCityReducer,
    favoriteCities: favoriteCitiesReducer,
    propertiesDisplay: propertiesDisplayReducer
});
