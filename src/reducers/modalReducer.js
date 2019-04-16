import * as types from '../types';

const initialState = {
    showModal: false,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            return {
                ...state,
                showModal: action.payload
            };
        default:
            return {...state};
    }
};