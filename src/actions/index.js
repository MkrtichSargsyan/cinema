import * as types from '../types';

import axios from 'axios';


export const fetchFilms = (url) => {
    return async dispatch => {

        dispatch(fetchFilmsStart());

        // await wait(500);

        try {
            const response = await axios.get(url);
            dispatch(fetchFilmsSuccess(response.data.results))
        } catch (e) {
            dispatch(fetchFilmsError(e))
        }

    }
};

const fetchFilmsStart = () => {
    return {
        type: types.FETCH_FILMS_START
    }
};

const fetchFilmsSuccess = (films) => {
    return {
        type: types.FETCH_FILMS_SUCCESS,
        films,
    }
};

const fetchFilmsError = (e) => {
    return {
        type: types.FETCH_FILMS_ERROR,
        error: e
    }
};

export const selectFilm = (id) => {
    return async dispatch => {

        dispatch(selectFilmStart());

        // await wait(500);

        const response = await axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=8f41c127dae95fb58daf9550cee43f28`);
        dispatch(selectFilmSuccess(response.data));
    }
};

const selectFilmStart = () => {
    return {
        type: types.FILM_SELECTED_START,
    }
};

const selectFilmSuccess = (film) => {
    return {
        type: types.FILM_SELECTED_SUCCESS,
        payload: film
    }
};

export const openModal = (option) => {
    return {
        type: types.OPEN_MODAL,
        payload: option,
    }
};

// async function wait(ms) {
//     return new Promise(resolve => {
//         setTimeout(resolve, ms);
//     });
// }