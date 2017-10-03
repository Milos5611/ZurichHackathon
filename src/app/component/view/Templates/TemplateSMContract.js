import {
    FloatingActionButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import { greenA200, grey500, } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import InstanceIcon from "material-ui/svg-icons/av/play-circle-outline";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import React from "react";
import uuid from "uuid";

const style = {
    table: {
        position: "absolute",
        top: "85px",
        margin: "0 90px",
        left: 0
    }
};

class TemplateSMContract extends PureComponent {

    static propTypes = {
        templates: PropTypes.object
    };

    constructor( props ) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    handleOpen() {
        return true;
    }

    render() {
        const { templates } = this.props;
        return (
            <div>
                <Header/>
                <div className="details">
                    <Table
                        wrapperStyle={style.table}
                        selectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn
                                    tooltip="Name"
                                >{"Name"}
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="Date Issued"
                                >{"Date Issued"}
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="Date Ends"
                                >{"Date Ends"}
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="Comment"
                                >{"Comment"}
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="Actions"
                                >{"Actions"}
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover
                        >
                            {
                                templates && templates.templates.map(map => {
                                    return (
                                        <TableRow key={uuid.v4()}>
                                            <TableRowColumn
                                                style={{ overflow: "visible" }}
                                            >{map.text}
                                            </TableRowColumn>
                                            <TableRowColumn
                                                style={{ overflow: "visible" }}
                                            >{map.dateStart}
                                            </TableRowColumn>
                                            <TableRowColumn
                                                style={{ overflow: "visible" }}
                                            >{map.dateEnd}
                                            </TableRowColumn>
                                            <TableRowColumn
                                                style={{ overflow: "visible" }}
                                            >{map.comment}
                                            </TableRowColumn>
                                            <TableRowColumn style={{ overflow: "visible" }}>

                                                <InstanceIcon
                                                    color={grey500}
                                                    hoverColor={greenA200}
                                                />

                                            </TableRowColumn>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <FloatingActionButton
                        onTouchTap={this.handleOpen}
                        className="add-events--button"
                    >
                        <ContentAdd/>
                    </FloatingActionButton>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default TemplateSMContract;
