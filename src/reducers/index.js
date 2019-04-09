import {combineReducers} from 'redux';
import {filmReducer} from './filmsReducer';


export default combineReducers({
    films:filmReducer,
})
