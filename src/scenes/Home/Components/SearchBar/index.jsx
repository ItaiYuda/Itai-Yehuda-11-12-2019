import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { requestSearchCities, requestCurrentCity, nullifyErrors } from '../../../../store/actions/actions';
import ModalMessage from '../../../../components/ModalMessage';
import './style.scss';

const SearchBar = () => {
    const { isLoading, error, cities } = useSelector(
        state => state.search
    );
    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);
    const [modalActivated, setModalActivated] = useState(true);

    const handleCloseError = () => {
        setShowError(false);
        setModalActivated(true);
        dispatch(nullifyErrors());
    }

    if (error !== '' && modalActivated) {
        setModalActivated(false);
        setShowError(true);
    }

    const handleSearch = query => {
        dispatch(requestSearchCities(query));
    };
    const handleChange = query => {
        if (query.length === 1) {
            dispatch(requestCurrentCity(query[0]));
        }
    };

    return (
        <div className='search-input'>
            <AsyncTypeahead
                className='dark-input'
                isLoading={isLoading}
                minLength={1}
                id="search-bar"
                bsSize="large"
                placeholder="Search City"
                onSearch={(query) => {
                    handleSearch(query);
                }}
                delay={0}
                onChange={handleChange}
                options={cities}
            />
            <ModalMessage
                error={error}
                show={showError}
                handleClose={handleCloseError}
            />
        </div>
    );
};

export default SearchBar;
