import { Checkbox, DatePicker, Divider, FlatButton } from "material-ui";
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
        padding: 10,
        marginBottom: "150px"
    },
    inputs: {
        width: "100%"
    },
    button: {
        backgroundColor: "rgb(0, 188, 212)",
        width: 240,
        height: 57,
        boxShadow: "none"
    },
    checkbox: {
        marginBottom: 16,
    },
    uploadInput: {
        cursor: "pointer",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: "100%",
        opacity: 0,
    },
};

class TemplateCache extends PureComponent {

    static propTypes = {};

    constructor( props ) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="details">
                    <Paper
                        style={style.paper}
                        zDepth={2}
                        rounded
                        className="pisa-login"
                    >
                        <p style={{ color: "red" }}>{"INFORMATION RELATED TO USER"}</p>
                        <Divider/>

                        <TextField
                            type="text"
                            floatingLabelText="Name"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Address of conflicted apartment"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="New Address"
                            style={style.inputs}
                        />
                        <DatePicker
                            hintText="Date of moving out"
                            floatingLabelText="Date of moving out"
                            fullWidth
                        />

                        <Checkbox
                            label="Simple"
                            style={style.checkbox}
                        />
                        <Checkbox
                            label="Simple with controlled value"
                            checked={this.state.checked}
                            onCheck={this.updateCheck.bind(this)}
                            style={style.checkbox}
                        />

                        <p style={{ paddingTop: 20, color: "red" }}>{"INFORMATION RELATED TO LANDLORD"}</p>
                        <Divider/>

                        <TextField
                            type="text"
                            floatingLabelText="Name"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Company name (optional)"
                            style={style.inputs}
                        />
                        <TextField
                            type="text"
                            floatingLabelText="Address"
                            style={style.inputs}
                        />

                        <div className="up-contract">
                            <p>{"Upload Contract"}</p>
                            <FlatButton
                                label="SELECT"
                                labelPosition="before"
                                containerElement="label"
                            >
                                <input
                                    type="file"
                                    style={style.uploadInput}
                                />
                            </FlatButton>
                        </div>
                        <div className="up-contract">
                            <p>{"Upload Deposit Contract And Account Statment"}</p>
                            <FlatButton
                                label="SELECT"
                                labelPosition="before"
                                containerElement="label"
                            >
                                <input
                                    type="file"
                                    style={style.uploadInput}
                                />
                            </FlatButton>
                        </div>
                        <div className="up-contract">
                            <p>{"Upload Protocol"}</p>
                            <FlatButton
                                label="SELECT"
                                labelPosition="before"
                                containerElement="label"
                            >
                                <input
                                    type="file"
                                    style={style.uploadInput}
                                />
                            </FlatButton>
                        </div>
                        <div className="up-contract">
                            <p>{"Please Download Power of Attorney, SignIn and Resend IT"}</p>
                            <FlatButton
                                label="SELECT"
                                labelPosition="before"
                                containerElement="label"
                            >
                                <input
                                    type="file"
                                    style={style.uploadInput}
                                />
                            </FlatButton>
                        </div>

                        <RaisedButton
                            buttonStyle={style.button}
                            style={{ height: 57, float: "right", marginTop: 10 }}
                            className="btn-success"
                            label="Submit"
                            labelColor="#fff"
                            icon={<VerifiedUser/>}
                        />
                    </Paper>
                </div>
                <Footer/>
            </div>
        );
    }

    updateCheck() {
        this.setState(( oldState ) => {
            return {
                checked: !oldState.checked,
            };
        });
    }
}

export default TemplateCache;
