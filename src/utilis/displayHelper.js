export const getDayInWeek = (date) => {
    const day = new Date(date * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day.getDay()];
}

export const getAvgTemperature = (max, min) => {
    return Math.round((min + max) / 2);
}

export const convertToFahrenheit = (temp) => {
    return Math.floor(temp * 1.8 + 32);
}