import { createStore, applyMiddleware,compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//https://stackoverflow.com/questions/55027240/connecting-redux-devtools-and-thunk-middleware-to-store

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
export default store;
