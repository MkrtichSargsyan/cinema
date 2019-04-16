import {createStore, applyMiddleware} from 'redux';
import reducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


export {store};