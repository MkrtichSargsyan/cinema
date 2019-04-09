import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import {BrowserRouter} from "react-router-dom";

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

import {auth} from '../src/firebase'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


auth.onAuthStateChanged((user) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App user={user}/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));
});



