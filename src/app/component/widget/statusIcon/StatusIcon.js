import {amber700, green300, grey500, lightGreen200} from "material-ui/styles/colors";
import CloudOff from "material-ui/svg-icons/file/cloud-off";
import NewIcon from "material-ui/svg-icons/av/new-releases";
import ProgressIcon from "material-ui/svg-icons/hardware/toys";
import PropTypes from "prop-types";
import React from "react";
import SentIcon from "material-ui/svg-icons/maps/local-shipping";
import SvgIcon from "material-ui/SvgIcon";

StatusIcon.propTypes = {
    status: PropTypes.string,
};

export default function StatusIcon(props) {

    let icon;
    switch (props.status) {

        case "NEW":
            icon = (<NewIcon color={lightGreen200}/>);
            break;
        case "IN_PROGRESS":
            icon = (<ProgressIcon color={amber700}/>);
            break;
        case "SENT":
            icon = (<SentIcon color={green300}/>);
            break;
        default :
            icon = (<CloudOff color={grey500}/>);
            break;
    }


    return (<SvgIcon>{icon}</SvgIcon>);

}
