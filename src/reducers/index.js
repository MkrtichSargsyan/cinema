import {combineReducers} from 'redux';
import {filmReducer} from './filmsReducer';
import {modalReducer} from './modalReducer';


export default combineReducers({
    filmReducer,
    modalReducer,
})
