import React from 'react';
import CardList from '../../components/CardList';
import '../Home/style.scss';
import { useSelector } from 'react-redux';

const FavoriteCities = () => {
    const { propertiesDisplay } = useSelector(state => state);
    return <div className={propertiesDisplay.isLight ? 'container' : 'container container-dark'}>
        <h1>Favorite Cities</h1>
        <CardList isFavorites={true} />
    </div>;
};

export default FavoriteCities;
