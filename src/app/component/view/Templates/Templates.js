import { Card, CardHeader, CardText } from "material-ui";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import { Link } from "react-router-dom";
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
            <div>
                <Header/>
                <div className="templates">
                    {
                        templates && templates.templates.map(card => {
                            return (
                                <Card
                                    style={{ width: "30%", display: "inline-block", margin: 10 }}
                                    className="template-card"
                                    key={uuid.v4()}
                                >
                                    <Link
                                        to={"/templates/" + card.id + (card.id === "1" ? "/cache" : card.id === "2" ? "/contract" : card.id === "3" ? "/court" : "/letter")}
                                    >
                                        <CardHeader
                                            title={card.name}
                                            subtitle={card.name}
                                        />
                                        <CardText style={{fontSize:18}}>
                                            {card.description}
                                        </CardText>
                                    </Link>
                                </Card>
                            );
                        })
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Templates;