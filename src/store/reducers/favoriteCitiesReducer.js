import { ADD_OR_REMOVE_FAVORITES } from '../actions/actionTypes';


export default (state = {}, action = {}) => {
    switch (action.type) {
        case ADD_OR_REMOVE_FAVORITES:

            return {
                ...action.payload.favoriteCities
            }
        /*return [...state, {
            cityName: city.cityName,
            country: city.country,
            cityKey: city.cityKey,
            temperature: {
                ...city.temperature,
                Metric: {
                    ...city.temperature.Metric,
                    Value: city.temperature.Metric.Value
                },
                Imperial: {
                    ...city.temperature.Imperial,
                    Value: city.temperature.Imperial.Value
                }
            },
            weatherText: action.payload.weatherText
        }];*/
        default:
            return state;
    }
}