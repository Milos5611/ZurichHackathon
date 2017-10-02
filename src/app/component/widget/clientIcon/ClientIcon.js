import MobileIcon from "material-ui/svg-icons/hardware/phone-iphone";
import NoneIcon from "material-ui/svg-icons/hardware/phonelink-off";
import PropTypes from "prop-types";
import React from "react";
import SvgIcon from "material-ui/SvgIcon";
import WebIcon from "material-ui/svg-icons/hardware/laptop-mac";
import {grey500} from "material-ui/styles/colors";

ClientIcon.propTypes = {
    type: PropTypes.string,
};

export default function ClientIcon(props) {

    let icon;
    switch (props.type) {

        case "MOBILE":
            icon = (<MobileIcon color={grey500}/>);
            break;
        case "WEB":
            icon = (<WebIcon color={grey500}/>);
            break;
        default :
            icon = (<NoneIcon color={grey500}/>);
            break;
    }


    return (<SvgIcon>{icon}</SvgIcon>);

}
