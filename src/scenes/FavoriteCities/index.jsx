import React from 'react';
import CardList from '../../components/CardList';
import './style.scss';
import { useSelector } from 'react-redux';

const FavoriteCities = () => {
    const { propertiesDisplay } = useSelector(state => state);
    return <div className='fav-container'>
        <h1 className={propertiesDisplay.isLight ? '' : 'h1-dark'}>Favorite Cities</h1>
        <CardList isFavorites={true} />
    </div>;
};

export default FavoriteCities;
