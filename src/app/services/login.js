import { TYPE_KEY } from "../common/constant";
import { showNotification } from "./notification";

const LOGIN_SUCCESSFUL_ACTION = "LOGIN_SUCCESSFUL";
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const LOGIN_FAILED_ACTION = "LOGIN_FAILED_ACTION";
const SHOW_HIDE_PASSWORD_ACTION = "SHOW_HIDE_PASSWORD_ACTION";
const LOGOUT = "LOGOUT";

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
    return { [TYPE_KEY]: LOGOUT };
}

export function doLogin() {
    return ( dispatch, getState ) => {
        if ( getState().login[ USERNAME ] === "milos.nikolic@gmail.com" && getState().login[ PASSWORD ] === "milos" ) {
            dispatch(loginSuccessful(getState().login[ USERNAME ], getState().login[ PASSWORD ]));
            dispatch(showNotification("Login succeeded", "X"));
        }
        else {
            dispatch(loginFail());
            dispatch(showNotification("Login failed", "X"));
        }
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

export function loginSuccessful( userName, password ) {
    return {
        [TYPE_KEY]: LOGIN_SUCCESSFUL_ACTION,
        [USERNAME]: userName,
        [TOKEN]: password
    };
}

export function loginFail() {
    return {
        [TYPE_KEY]: LOGIN_FAILED_ACTION
    };
}
