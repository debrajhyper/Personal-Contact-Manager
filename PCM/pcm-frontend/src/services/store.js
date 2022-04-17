import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./rootReducer";
// import authToken from "./utils/authToken";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

// const token = localStorage.jwtToken;
// if(token) {
//     authToken(token);
// }

export default store;