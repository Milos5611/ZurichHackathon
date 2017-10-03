import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import TimePicker from "material-ui/TimePicker"

const style = {
    eventCreate: {
        dialogRoot: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 0
        },
        dialogContent: {
            position: "relative",
            width: "100vw",
            transform: "",
        },
        dialogBody: {
            paddingBottom: 0,
            maxHeight: "100%"
        },
        datePicker: {
            width: "100%",
            height: "65px"
        },
        actionContainer: {
            borderBottom: "none"
        }
    }
};

class EventCreate extends Component {
    constructor( props ) {
        super(props);
    }

    render() {
        return (
            <Dialog
                autoScrollBodyContent
                className="event-create--popup"
                actionsContainerStyle={style.eventCreate.actionContainer}
                contentStyle={style.eventCreate.dialogContent}
                bodyClassName="event-create--body"
                bodyStyle={style.eventCreate.dialogBody}
                style={style.eventCreate.dialogRoot}
                modal={false}
                repositionOnUpdate={false}>

                <div className="event-create--info">
                    <h3>{"Something"}</h3>
                    <p>{"Detail"}</p>
                </div>

                <TextField
                    type="text"
                    floatingLabelText="Title"
                    fullWidth
                />
                <TextField
                    type="text"
                    floatingLabelText="Description"
                    fullWidth
                />
                <DatePicker
                    autoOk
                    hintText="Date"
                    textFieldStyle={style.eventCreate.datePicker}/>
                <TimePicker
                    autoOk
                    format="24hr"
                    hintText="Time"
                    textFieldStyle={style.eventCreate.datePicker}
                />
                <TextField
                    type="number"
                    floatingLabelText="Capacity"
                    fullWidth
                />
            </Dialog>
        );
    }
}

export default EventCreate;