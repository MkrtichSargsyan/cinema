import * as types from '../types';

import axios from 'axios';


export const fetchFilms = (url) => async dispatch => {
    const response = await axios.get(url);
    return dispatch({type: types.FETCH_FILMS, payload: response.data.results})
};

export const selectFilm = film => {
    return {
        type: types.FILM_SELECTED,
        payload: film
    }
};

