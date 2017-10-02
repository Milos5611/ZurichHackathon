import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import TextField from "material-ui/TextField";
import VerifiedUser from "material-ui/svg-icons/action/verified-user";

const style = {
    paper: {
        margin: "auto",
    },
    inputs: {
        width: "100%"
    },
    button: {
        backgroundColor: "#A0C52A",
        width: 240,
        height: 57,
        boxShadow: "none"
    }
};

class Registration extends PureComponent {

    static defaultProps = {
        username: "",
        password: "",
        userIsLoggedIn: false
    };

    static propTypes = {
        changeUsername: PropTypes.func,
        changePassword: PropTypes.func,
        showHide: PropTypes.func,
        showPassword: PropTypes.bool,
    };

    constructor( props ) {
        super(props);
        this.handleShowHide = ::this.handleShowHide;
        this.handleUsernameChanged = ::this.handleUsernameChanged;
        this.handlePasswordChanged = ::this.handlePasswordChanged;
        this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
        this.handleLogin = :: this.handleLogin;
    }

    handleShowHide() {
        let { showPassword, showHide } = this.props;
        showHide(showPassword);
    }

    handleUsernameChanged( event ) {
        let { changeUsername } = this.props;
        changeUsername(event.target.value);
    }

    handlePasswordChanged( event ) {
        let { changePassword } = this.props;
        changePassword(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="login--background__wrapper"/>
                <div className="login--header">
                    <Paper
                        style={style.paper}
                        zDepth={2}
                        rounded
                        className="pisa-login"
                    >
                        <div className="login--head"/>
                        <div className="login--field">
                            <TextField
                                type="text"
                                floatingLabelText="Name"
                                style={style.inputs}
                                onChange={this.handleUsernameChanged}
                            />
                            <TextField
                                type="text"
                                floatingLabelText="E-mail"
                                style={style.inputs}
                                onChange={this.handlePasswordChanged}
                            />
                            <TextField
                                type="text"
                                floatingLabelText="Contact"
                                style={style.inputs}
                                onChange={this.handleUsernameChanged}
                            />
                        </div>

                        <RaisedButton
                            buttonStyle={style.button}
                            style={{ height: 57 }}
                            className="btn-success"
                            label="Submit Request"
                            labelColor="#fff"
                            icon={<VerifiedUser/>}
                        />
                        <p
                            style={{ display: "inline-block" }}
                        >
                            <Link
                                to={"/registration"}
                            >{"Go To Login"}
                            </Link>
                        </p>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Registration;
