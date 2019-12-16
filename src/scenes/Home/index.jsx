import React from 'react';
import SearchBar from './Components/SearchBar';
import { useSelector } from 'react-redux';
import Main from './Components/Main';
import './style.scss';

const Home = () => {
    const { propertiesDisplay } = useSelector(state => state);
    return (
        <div className={propertiesDisplay.isLight ? 'container' : 'container container-dark'}>
            <SearchBar />
            <Main />
        </div>
    );
};

export default Home;
