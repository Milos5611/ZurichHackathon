import {injectIntl, intlShape} from "react-intl";
import {Component} from "react";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PropTypes from "prop-types";
import React from "react";
import TextField from "material-ui/TextField";

const initialState = {
    cancelDisabled: false,
    createDisabled: false,
    nameValue: "",
    nameErrorText: undefined,
    mailValue: "",
    mailErrorText: undefined,
    dateValue: undefined,
    dateErrorText: undefined
};

const style = {
    textField : {
        width: "500px"
    }
};

class SurveyInstanceInvitationDialog extends Component {

    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.node,
        open: PropTypes.bool,
        closeDialog: PropTypes.func,
        intl: intlShape.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleClose = ::this.handleClose;
        this.handleSave = :: this.handleSave;
        this.handleNameInput = :: this.handleNameInput;
        this.handleMailInput = :: this.handleMailInput;
        this.handleDateInput = :: this.handleDateInput;
        this.handleNameBlur = :: this.handleNameBlur;
        this.handleMailBlur = :: this.handleMailBlur;
        this.state = initialState;
    }

    handleSave() {

        if (this.state.createDisabled) {
            return;
        }

        let valid = true;

        if (!this.state.nameValue) {
            valid = false;
            this.setState({
                nameErrorText: this.props.intl.formatMessage({"id": "invitation.form.name.error.required"})
            });
        }

        if (!this.state.mailValue) {
            valid = false;
            this.setState({
                mailErrorText: this.props.intl.formatMessage({"id": "invitation.form.mail.error.required"})
            });
        }

        if (valid) {
            this.props.closeDialog();
            this.props.showNotification(this.props.intl.formatMessage({id: "invitation.form.creation.successful"}, {name: this.state.nameValue}));
            this.setState(initialState);
        }
    }


    handleClose() {

        if (this.state.cancelDisabled) {
            return;
        }

        this.props.closeDialog();
    }

    handleNameInput(event, newValue) {
        this.setState({
            nameValue: newValue,
            nameErrorText: undefined
        });
    }

    handleMailInput(event, newValue) {
        this.setState({
            mailValue: newValue,
            mailErrorText: undefined
        });
    }

    handleDateInput(event, newValue) {
        this.setState({
            dateValue: newValue,
            dateErrorText: undefined
        });
    }

    handleNameBlur(event) {
        let newValue = event.currentTarget.value;

        if (newValue === "" || newValue === undefined) {
            this.setState({
                nameErrorText: this.props.intl.formatMessage({"id": "invitation.form.name.error.required"}),
            });
        }
    }

    handleMailBlur(event) {
        let newValue = event.currentTarget.value;

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (newValue === "" || newValue === undefined) {
            this.setState({
                mailErrorText: this.props.intl.formatMessage({"id": "invitation.form.mail.error.required"}),
            });
        } else if (!regex.test(newValue)) {
            this.setState({
                mailErrorText: this.props.intl.formatMessage({"id": "invitation.form.mail.error.invalid"}),
            });
        }

    }


    render() {

        const {title, open, children, intl} = this.props;

        if (!open) {
            return (<div>{children}</div>);
        }

        const actions = [
            <FlatButton
                key="cancel"
                label={intl.formatMessage({"id": "invitation.form.button.cancel"})}
                primary
                onTouchTap={this.handleClose}
                disabled={this.state.cancelDisabled}
            />,
            <FlatButton
                key="create"
                label={intl.formatMessage({"id": "invitation.form.button.create"})}
                primary
                onTouchTap={this.handleSave}
                disabled={this.state.createDisabled}
            />
        ];

        return (
            <div>

                {children}

                <Dialog
                    modal
                    title={title}
                    actions={actions}
                    autoScrollBodyContent
                    open
                >

                    <TextField
                        floatingLabelText={intl.formatMessage({"id": "invitation.form.survey.name.floating-label"})}
                        onChange={this.handleNameInput}
                        value={this.state.nameValue}
                        errorText={this.state.nameErrorText}
                        onBlur={this.handleNameBlur}
                        style={style.textField}
                    />

                    <TextField
                        style={style.textField}
                        floatingLabelText={intl.formatMessage({"id": "invitation.form.survey.mail.floating-label"})}
                        onChange={this.handleMailInput}
                        value={this.state.mailValue}
                        errorText={this.state.mailErrorText}
                        onBlur={this.handleMailBlur}
                    />

                    <DatePicker
                        autoOk
                        textFieldStyle={style.textField}
                        minDate={new Date()}
                        onChange={this.handleDateInput}
                        floatingLabelText={intl.formatMessage({"id": "invitation.form.survey.date.hint-label"})}
                        hintText={intl.formatMessage({"id": "invitation.form.survey.date.hint-label"})}
                        value={this.state.dateValue}
                        mode="landscape"
                    />

                </Dialog>
            </div>
        );
    }
}

export default injectIntl(SurveyInstanceInvitationDialog);
