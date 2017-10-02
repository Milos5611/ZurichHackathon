import PropTypes from "prop-types";
import React from "react";
import Snackbar from "material-ui/Snackbar";

Notification.propTypes = {
    "open": PropTypes.bool.isRequired,
    "messageNode": PropTypes.node,
    "actionNode": PropTypes.node,
    "autoHideDuration": PropTypes.number.isRequired,
    "actionTouchTapCallback": PropTypes.func.isRequired,
    "requestCloseCallback": PropTypes.func.isRequired
};

export default function Notification( { open, messageNode, actionNode, autoHideDuration, actionTouchTapCallback, requestCloseCallback } ) {

    return (
        <Snackbar
            open={open}
            message={messageNode}
            autoHideDuration={autoHideDuration}
            action={actionNode}
            onActionTouchTap={actionTouchTapCallback}
            onRequestClose={requestCloseCallback}
        />
    );

}
