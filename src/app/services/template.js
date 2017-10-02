import { TYPE_KEY } from "../common/constant";

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
