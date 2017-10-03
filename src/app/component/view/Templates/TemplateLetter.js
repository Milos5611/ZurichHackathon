import { DatePicker } from "material-ui";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import Paper from "material-ui/Paper";
import { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import TextField from "material-ui/TextField";
import VerifiedUser from "material-ui/svg-icons/action/verified-user";

const style = {
    paper: {
        margin: "auto",
        padding: 10
    },
    inputs: {
        width: "100%"
    },
    button: {
        backgroundColor: "rgb(0, 188, 212)",
        width: 240,
        height: 57,
        boxShadow: "none"
    }
};

class TemplateLetter extends PureComponent {

    static propTypes = {};

    constructor( props ) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="details">
                    <p className="intro-letter">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec mattis pretium massa. Aliquam erat volutpat. "}</p>
                    <Paper
                        style={style.paper}
                        zDepth={2}
                        rounded
                        className="pisa-login"
                    >
                        <TextField
                            type="text"
                            floatingLabelText="Email address"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Address of tenant"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Address of landlord"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Place"
                            style={style.inputs}
                        />

                        <DatePicker
                            hintText="Date"
                            floatingLabelText="Date"
                            fullWidth
                        />

                        <RaisedButton
                            buttonStyle={style.button}
                            style={{ height: 57, float: "right", marginTop: 10 }}
                            className="btn-success"
                            label="Get the letter"
                            labelColor="#fff"
                            icon={<VerifiedUser/>}
                        />
                    </Paper>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default TemplateLetter;
