import React, { useEffect } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initState } from './store/actions/actions';
import initCity from './config/initCity.js';
import Home from './scenes/Home';
import FavoriteCities from './scenes/FavoriteCities';
import NavBar from './components/NavBar/index.jsx';
import PageNotFound from './components/PageNotFound';


function App() {
    const { propertiesDisplay } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {

        const initData = () => {
            dispatch(initState(initCity.cityName, initCity.cityKey, initCity.country));
        }

        initData();
    }, []);
    return (
        <div className={propertiesDisplay.isLight ? '' : 'dark'} >
            <Router>
                <NavBar />
                <Switch>
                    <Route path='/favorites' component={FavoriteCities} />
                    <Route exact path='/' component={Home} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
