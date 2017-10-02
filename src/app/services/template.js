import { TYPE_KEY } from "../common/constant";
import rest from "../common/rest";

const TEMPLATES_RECEIVED_ACTION = "TEMPLATES_RECEIVED_ACTION";

export const TEMPLATES = "templates";

const initialState = {
    [TEMPLATES]: []
};

export default function reducer( state = initialState, action ) {
    let newState;

    switch ( action[ TYPE_KEY ] ) {

        case TEMPLATES_RECEIVED_ACTION:
            newState = Object.assign({}, state, {
                [TEMPLATES]: action[ TEMPLATES ]
            });
            break;
        default:
            newState = Object.assign({}, state, {});
            break;
    }
    return newState;
}

export function getAllTemplates() {
    return ( dispatch ) => {
        rest.doGet("api/data.json").then(json => {
            json.data ?
                dispatch(receivedSuccessful(json.data)) :
                null;
        });
    };
}

function receivedSuccessful( templates ) {
    return {
        [TYPE_KEY]: TEMPLATES_RECEIVED_ACTION,
        [TEMPLATES]: templates
    };
}
