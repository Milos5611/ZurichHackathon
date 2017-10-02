import Proptypes from "prop-types";
import React from "react";

class Templates extends React.Component {

    static propTypes = {
        templates: Proptypes.array
    };

    constructor( props ) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>{"Milos Nikolic"}</p>
            </div>
        );
    }
}

export default Templates;