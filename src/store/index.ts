import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Reducers} from './reducer'

const composeEnhancers = compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;