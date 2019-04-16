import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {auth} from '../src/firebase';

import {store} from "./configureStore";


auth.onAuthStateChanged((user) => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App user={user}/>
            </BrowserRouter>
        </Provider>,

        document.getElementById('root'));
});



