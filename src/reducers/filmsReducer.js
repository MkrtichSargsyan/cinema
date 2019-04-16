import * as types from '../types';


const initialState = {
    films: null,
    loading: false,
    error: null,
    selectedFilm: null,
};


export const filmReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_FILMS_START:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_FILMS_SUCCESS:
            return {
                ...state,
                loading: false,
                films: action.films
            };
        case types.FETCH_FILMS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        //-----------------------------------------//
        //-----------------------------------------//
        //-----------------------------------------//
        case types.FILM_SELECTED_START:
            return {
                ...state,
                selectedFilm: null,
                loading: true
            };

        case types.FILM_SELECTED_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedFilm: action.payload
            };

        default :
            return state;
    }
};
