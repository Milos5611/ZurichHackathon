import {beginLoading, endLoading} from "./loadingSpinner";
import {createErrorMessages, messagesReceived} from "./message";
import {TYPE_KEY} from "../common/constant";
import rest from "../common/rest";
import {showNotification} from "./notification";

const LOAD_SURVEY_ACTION = "SURVEYS.LOAD_SURVEY_ACTION";
const LOAD_SURVEYS_ACTION = "SURVEYS.LOAD_SURVEYS_ACTION";
const LOAD_SURVEY_INSTANCES_ACTION = "SURVEYS.LOAD_SURVEY_INSTANCES_ACTION";
const OPEN_SURVEY_DIALOG_ACTION = "SURVEYS.OPEN_SURVEY_DIALOG_ACTION";
const CLOSE_SURVEY_DIALOG_ACTION = "SURVEYS.CLOSE_SURVEY_DIALOG_ACTION";
const OPEN_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION = "SURVEYS.OPEN_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION";
const CLOSE_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION = "SURVEYS.CLOSE_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION";
const CREATE_SURVEY_INSTANCE_ACTION = "SURVEYS.CREATE_SURVEY_INSTANCE_ACTION";
const DELETE_SURVEY_INSTANCE_ACTION = "SURVEYS.DELETE_SURVEY_INSTANCE_ACTION";


export const SURVEY = "survey";
export const SURVEY_LIST = "surveyList";
export const SURVEY_INSTANCE = "surveyInstance";
export const SURVEY_INSTANCE_LIST = "surveyInstanceList";
export const SURVEY_INSTANCE_GID = "surveyInstanceGid";
export const SURVEY_DIALOG_OPEN = "surveyDialogOpen";
export const SURVEY_INSTANCE_INVITATION_DIALOG_OPEN = "invitationDialogOpen";

const initialState = {
    [SURVEY]: null,
    [SURVEY_LIST]: null,
    [SURVEY_INSTANCE_LIST]: null,
    [SURVEY_INSTANCE]: null,
    [SURVEY_INSTANCE_GID]: null,
    [SURVEY_DIALOG_OPEN]: false,
    [SURVEY_INSTANCE_INVITATION_DIALOG_OPEN]: false
};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action[TYPE_KEY]) {

        case LOAD_SURVEYS_ACTION:
            newState = {
                ...state,
                [SURVEY_LIST]: action[SURVEY_LIST]
            };
            break;

        case OPEN_SURVEY_DIALOG_ACTION:
            newState = {
                ...state,
                [SURVEY_DIALOG_OPEN]: true
            };
            break;

        case CLOSE_SURVEY_DIALOG_ACTION:
            newState = {
                ...state,
                [SURVEY_DIALOG_OPEN]: false
            };
            break;

        case OPEN_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION:
            newState = {
                ...state,
                [SURVEY_INSTANCE_INVITATION_DIALOG_OPEN]: true
            };
            break;

        case CLOSE_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION:
            newState = {
                ...state,
                [SURVEY_INSTANCE_INVITATION_DIALOG_OPEN]: false
            };
            break;

        case LOAD_SURVEY_INSTANCES_ACTION:
            newState = {
                ...state,
                [SURVEY_INSTANCE_LIST]: action[SURVEY_INSTANCE_LIST]
            };
            break;

        case LOAD_SURVEY_ACTION:
            newState = {
                ...state,
                [SURVEY]: action[SURVEY]
            };
            break;

        case CREATE_SURVEY_INSTANCE_ACTION:
            newState = {
                ...state,
                [SURVEY_INSTANCE]: action[SURVEY_INSTANCE]
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

export function loadSurveyListFilter() {
    return (dispatch) => {
        rest.doGet(`${window.com.mainlevel.BASE_URL}/business_pisa/surveys/stats/`).then(json => {
            if (json.surveys) {
                dispatch(loadSurveyListSuccessful(json.surveys));
            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function loadSurvey(surveyGid) {
    return (dispatch) => {
        rest.doGet(`${window.com.mainlevel.BASE_URL}/business_pisa/v2/surveys/${surveyGid}`).then(json => {
            if (json) {
                dispatch(loadSurveySuccessful(json));
            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function loadSurveyInstanceListFilter(surveyGid) {
    return (dispatch) => {
        dispatch(beginLoading());
        rest.doGet(`${window.com.mainlevel.BASE_URL}/business_pisa/surveys/${surveyGid}/instances/`).then(json => {
            if (json.surveys) {
                dispatch(loadSurveyInstanceListSuccessful(json.surveys));
            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        }).then(() => {
            dispatch(endLoading());
        });
    };
}

export function createSurveyInstance(surveyGid, payload) {
    return (dispatch) => {
        rest.doPost(`${window.com.mainlevel.BASE_URL}/business_pisa/surveys/${surveyGid}/instances/`, JSON.stringify(payload)).then(json => {
            if (json) {
                dispatch(createInstanceSuccessful(json.surveyInstance));
                dispatch(loadSurveyInstanceListFilter(surveyGid));

            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function deleteSurveyInstance(surveyGid, surveyInstanceGid) {
    return (dispatch) => {
        rest.doDelete(`${window.com.mainlevel.BASE_URL}/business_pisa/surveys/${surveyGid}/instances/${surveyInstanceGid}`).then(json => {
            if (json) {
                dispatch(deleteInstanceSuccessful(surveyInstanceGid));
                dispatch(loadSurveyInstanceListFilter(surveyGid));
                dispatch(showNotification("Survey Instance successfully deleted", "X"));
            } else {
                dispatch(messagesReceived(createErrorMessages(json)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function handleExport(surveyGid) {
    rest.doGet(`${window.com.mainlevel.BASE_URL}/business_pisa/surveys/${surveyGid}/report/summary`, "text/csv").then(response => {
        let FileSaver = require("file-saver");
        let blob = new Blob(response.response.split(), {type: "text/csv;charset=utf-8"});

        FileSaver.saveAs(blob, "export_" + surveyGid + ".csv");
    });
}

export function loadSurveySuccessful(survey) {
    return {[TYPE_KEY]: LOAD_SURVEY_ACTION, [SURVEY]: survey};
}

export function loadSurveyListSuccessful(list) {
    return {[TYPE_KEY]: LOAD_SURVEYS_ACTION, [SURVEY_LIST]: list};
}

export function loadSurveyInstanceListSuccessful(list) {
    return {[TYPE_KEY]: LOAD_SURVEY_INSTANCES_ACTION, [SURVEY_INSTANCE_LIST]: list};
}

export function createInstanceSuccessful(surveyInstance) {
    return {[TYPE_KEY]: CREATE_SURVEY_INSTANCE_ACTION, [SURVEY_INSTANCE]: surveyInstance};
}

export function deleteInstanceSuccessful(surveyInstanceId) {
    return {[TYPE_KEY]: DELETE_SURVEY_INSTANCE_ACTION, [SURVEY_INSTANCE_GID]: surveyInstanceId};
}

export function openSurveyDialog() {
    return {[TYPE_KEY]: OPEN_SURVEY_DIALOG_ACTION};
}

export function closeSurveyDialog() {
    return {[TYPE_KEY]: CLOSE_SURVEY_DIALOG_ACTION};
}

export function openInvitationDialog() {
    return {[TYPE_KEY]: OPEN_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION};
}

export function closeInvitationDialog() {
    return {[TYPE_KEY]: CLOSE_SURVEY_INSTANCE_INVITATION_DIALOG_ACTION};
}
