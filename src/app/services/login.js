import { createErrorMessages, messagesReceived } from "./message";
import { TYPE_KEY } from "../common/constant";
import rest from "../common/rest";
import { showNotification } from "./notification";

const LOGIN_SUCCESSFUL_ACTION = "LOGIN_SUCCESSFUL";
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const LOGIN_FAILED_ACTION = "LOGIN_FAILED_ACTION";
const SHOW_HIDE_PASSWORD_ACTION = "SHOW_HIDE_PASSWORD_ACTION";
const LOGIN_COOKIE_AVAILABLE = "LOGIN_COOKIE_AVAILABLE";
const LOGOUT = "LOGOUT";

export const COOKIE_LOGIN = "mlSolution";

export const IS_LOGGED_IN = "userIsLoggedIn";
export const USERNAME = "username";
export const PASSWORD = "password";
export const LOGIN_FAILED = "loginFailed";
export const SHOW_PASSWORD = "showPassword";
export const TOKEN = "token";

const initialState = {
    [IS_LOGGED_IN]: false,
    [USERNAME]: "",
    [PASSWORD]: "",
    [LOGIN_FAILED]: false,
    [SHOW_PASSWORD]: false,
    [TOKEN]: ""
};

export default function reducer( state = initialState, action ) {

    let newState;

    switch ( action[ TYPE_KEY ] ) {

        case LOGIN_SUCCESSFUL_ACTION:
            newState = {
                ...state,
                [TOKEN]: action[ TOKEN ],
                [IS_LOGGED_IN]: true,
                [LOGIN_FAILED]: false
            };
            break;

        case CHANGE_USERNAME:
            newState = {
                ...state,
                [USERNAME]: action[ USERNAME ]
            };
            break;

        case CHANGE_PASSWORD:
            newState = {
                ...state,
                [PASSWORD]: action[ PASSWORD ]
            };
            break;

        case SHOW_HIDE_PASSWORD_ACTION:
            newState = {
                ...state,
                [SHOW_PASSWORD]: action[ SHOW_PASSWORD ]
            };
            break;

        case LOGOUT: {
            newState = {
                ...initialState
            };
            break;
        }

        default:
            newState = {
                ...state
            };
            break;
    }

    return newState;
}

export function logout() {
    return {[TYPE_KEY] : LOGOUT};
}

export function checkCookieLogin(cookies) {

    const loginCookies = cookies.get(COOKIE_LOGIN);

    if(loginCookies) {
        return (dispatch) => {
            dispatch(loginSuccessful(loginCookies));
        };
    }

    return {[TYPE_KEY] : LOGIN_COOKIE_AVAILABLE};
}

export function doLogin(cookies) {
    return ( dispatch, getState ) => {
        rest.doLogin(
            `${window.com.mainlevel.BASE_URL}/authentication/token`, getState().login[ USERNAME ], getState().login[ PASSWORD ]
        ).then(currentUser => {
            if ( currentUser.token ) {
                cookies.set(COOKIE_LOGIN, {userName : currentUser.userName, token: currentUser.token});
                dispatch(loginSuccessful(currentUser));
                dispatch(showNotification("Login succeeded", "X"));
            }
        }, reason => {
            dispatch(loginFail());
            dispatch(messagesReceived(createErrorMessages(reason)));
            dispatch(showNotification("Login failed", "X"));
        });
    };
}

export function changeUsername( newUsername = "" ) {
    return {
        [TYPE_KEY]: CHANGE_USERNAME,
        [USERNAME]: newUsername.trim()
    };
}

export function changePassword( newPassword = "" ) {
    return {
        [TYPE_KEY]: CHANGE_PASSWORD,
        [PASSWORD]: newPassword.trim()
    };
}

export function showHide( password ) {
    return {
        [TYPE_KEY]: SHOW_HIDE_PASSWORD_ACTION,
        [SHOW_PASSWORD]: !password,
    };
}

export function loginSuccessful( currentUser ) {
    return {
        [TYPE_KEY]: LOGIN_SUCCESSFUL_ACTION,
        [USERNAME]: currentUser.userName,
        [TOKEN]: currentUser.token
    };
}

export function loginFail() {
    return {
        [TYPE_KEY]: LOGIN_FAILED_ACTION
    };
}
