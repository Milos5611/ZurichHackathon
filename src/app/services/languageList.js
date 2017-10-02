import { createErrorMessages, messagesReceived } from "./message";
import { TYPE_KEY } from "../common/constant";
import rest from "../common/rest";

export const CHANGE_LANGUAGE_ACTION = "LANGUAGES.CHANGE_LANGUAGE_ACTION";
export const LOAD_LANGUAGES_ACTION = "LANGUAGES.LOAD_LANGUAGES_ACTION";

export const LANGUAGE_LIST = "languageList";
export const LANGUAGE = "language";

const initialState = {
    [LANGUAGE_LIST]: [],
    [LANGUAGE]: "en_US"
};

export default function reducer( state = initialState, action ) {
    let newState;
    switch ( action[ TYPE_KEY ] ) {
        case LOAD_LANGUAGES_ACTION:
            newState = {
                ...state,
                [LANGUAGE_LIST]: action[ LANGUAGE_LIST ]
            };
            break;
        case CHANGE_LANGUAGE_ACTION:
            newState = {
                ...state,
                [LANGUAGE]: action[ LANGUAGE ]
            };
            break;
        default:
            newState = {
                ...state
            };
            break;
    }
    return newState;
}

export function loadLanguageList() {
    return (dispatch) => {
        rest.doGet(`${window.com.mainlevel.BASE_URL}/business_pisa/languages/`).then(json => {
            if (json) {
                dispatch(loadSuccessful(json.languages));
            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function loadSuccessful( list ) {
    return {
        [TYPE_KEY]: LOAD_LANGUAGES_ACTION,
        [LANGUAGE_LIST]: list
    };
}

export function changeLanguage( language ) {
    return ( dispatch ) => {
        dispatch({
            [TYPE_KEY]: CHANGE_LANGUAGE_ACTION,
            [LANGUAGE]: language
        });
    };
}
