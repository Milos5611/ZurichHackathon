import { applyMiddleware, combineReducers, createStore } from "redux";
import languageList from "../services/languageList";
import loading from "../services/loadingSpinner";
import login from "../services/login";
import notification from "../services/notification";
import surveyList from "../services/surveylist";
import thunk from "redux-thunk";

const reducers = {
    loading,
    languageList,
    login,
    notification,
    surveyList,
};

const logger = store => next => action => {

    let result = next(action);

    if ( process.env.NODE_ENV !== "production" ) {
        /* eslint-disable */
        console.group(action.type);
        console.info("Dispatching:", action);
        console.log("Next state:", store.getState());
        console.groupEnd(action.type);
        /* eslint-enable */
    }

    return result;
};

export default createStore(combineReducers(reducers), applyMiddleware(thunk, logger));
