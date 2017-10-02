/* eslint-disable no-console */
import React from "react";

export default class UserLookUp extends React.Component {
    static propTypes = {};

    constructor( props ) {
        super(props);
    }

    render() {
        return (
            <div>
                {console.log("Loaded")}
            </div>
        );
    }
}
