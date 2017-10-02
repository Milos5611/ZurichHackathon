import CircularProgress from "material-ui/CircularProgress";
import PropTypes from "prop-types";
import React from "react";

LabeledCircularProgress.propTypes = {
    max: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number
};

const styles = {
    container : {
        position: "relative",
        padding: "5px"
    },
    label : {
        position: "absolute",
        top: "23px",
        width: "50px",
        textAlign: "center",
        zIndex: 1
    }
};

export default function LabeledCircularProgress(props) {
    return (<div style={styles.container}>

        <span style={styles.label}>{props.label}</span>

        <CircularProgress
            mode="determinate"
            max={props.max}
            value={props.value}
            size={50}
            color={"#A0C52A"}
            thickness={3}
        />

    </div>
    );
}
