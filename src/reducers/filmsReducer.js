import * as types from '../types';


export const filmReducer = (state = null, action) => {
    switch (action.type) {
        case types.FETCH_FILMS:
            return action.payload;

        case types.FILM_SELECTED:
            return action.payload;
        default :
            return state;
    }
};