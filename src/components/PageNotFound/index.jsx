import React, { useState } from 'react';
import page404 from '../../utilis/images/pagenotfound.png';
import './style.css';
import { Redirect } from 'react-router-dom';

const PageNotFound = () => {
    const [redirect, setRedirect] = useState(false);
    const redirectToHome = () => {
        setRedirect(true);
    }
    if (redirect) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <img src={page404} alt='404 Page Not Found' className='page-not-found' />
            <div>
                <button onClick={redirectToHome}>To Home Page</button>
            </div>
        </div>
    )
}

export default PageNotFound
