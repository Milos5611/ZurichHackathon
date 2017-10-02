import { Card, CardHeader, CardText } from "material-ui";
import Proptypes from "prop-types";
import React from "react";
import uuid from "uuid";

class Templates extends React.Component {

    static propTypes = {
        templates: Proptypes.obj,
        getAllTemplates: Proptypes.func
    };

    constructor( props ) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllTemplates();
    }

    render() {
        const { templates } = this.props;
        return (
            <div className="templates">
                {
                    templates && templates.templates.map(card => {
                        return (
                            <Card
                                style={{ width: "30%", display: "inline-block", margin: 10 }}
                                className="template-card"
                                key={uuid.v4()}
                            >
                                <CardHeader
                                    title={card.name}
                                    subtitle={card.name}
                                />
                                <CardText>
                                    {card.description}
                                </CardText>
                            </Card>
                        );
                    })
                }
            </div>
        );
    }
}

export default Templates;