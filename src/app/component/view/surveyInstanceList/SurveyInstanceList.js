/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2] }]*/
import { Link, withRouter } from "react-router-dom";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import { greenA200, grey500 } from "material-ui/styles/colors";
import { injectIntl, intlShape } from "react-intl";
import ClientIcon from "../../widget/clientIcon/ClientIcon";
import DeleteIcon from "material-ui/svg-icons/action/delete-forever";
import DownloadIcon from "material-ui/svg-icons/file/file-download";
import Footer from "../../layout/footer/Footer";
import GoToRunnerIcon from "material-ui/svg-icons/action/open-in-new";
import Header from "../../layout/header/Header";
import IconButton from "material-ui/IconButton";
import Moment from "moment";
import NewAdhocIcon from "material-ui/svg-icons/content/add-circle-outline";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import StatusIcon from "../../widget/statusIcon/StatusIcon";
import uuid from "uuid";

const style = {
    exportButton: {
        "float": "right",
        "marginRight": "100px"
    },
    newButton: {
        "float": "right",
        "marginRight": "20px"
    },
    clearDiv: {
        "clear": "right"
    }
};

class SurveyInstanceList extends React.Component {

    static propTypes = {
        surveyInstanceList: PropTypes.array,
        loadSurveyInstanceListFilter: PropTypes.func,
        loadSurvey: PropTypes.func,
        location: PropTypes.object,
        loadSurveyInstance: PropTypes.func,
        createSurveyInstance: PropTypes.func,
        deleteSurveyInstance: PropTypes.func,
        openInvitationDialog: PropTypes.func,
        handleExport: PropTypes.func,
        intl: intlShape.isRequired
    };

    constructor( props ) {
        super(props);
        this.handleCreateNewInstance = ::this.handleCreateNewInstance;
        this.handleOpenInvitationDialog = ::this.handleOpenInvitationDialog;
        this.handleExportToCSV = ::this.handleExportToCSV;
    }

    componentDidMount() {
        const { loadSurveyInstanceListFilter, loadSurvey } = this.props;
        let surveyGid = this.props.location.pathname.split("/")[ 2 ];
        loadSurvey(surveyGid);
        loadSurveyInstanceListFilter(surveyGid);
    }

    handleCreateNewInstance() {
        const { createSurveyInstance } = this.props;
        let surveyGid = this.props.location.pathname.split("/")[ 2 ];

        const payload = {};

        createSurveyInstance(surveyGid, payload);
    }

    handleOpenInvitationDialog() {
        const { openInvitationDialog } = this.props;
        openInvitationDialog();
    }

    handleExportToCSV() {
        const { handleExport } = this.props;
        let surveyGid = this.props.location.pathname.split("/")[ 2 ];
        handleExport(surveyGid);
    }

    handleDelete( instanceGid ) {
        const { deleteSurveyInstance } = this.props;
        let surveyGid = this.props.location.pathname.split("/")[ 2 ];
        deleteSurveyInstance(surveyGid, instanceGid);
    }

    handleLoadInstance( instanceGid ) {
        const { loadSurveyInstance } = this.props;
        let surveyGid = this.props.location.pathname.split("/")[ 2 ];
        loadSurveyInstance(surveyGid, instanceGid);
    }

    render() {
        const { surveyInstanceList } = this.props;

        return (
            <div>
                <Header
                    showPage
                    showLanguage
                />

                <div>
                    <RaisedButton
                        primary
                        title={this.props.intl.formatMessage({ "id": "surveyinstancelist.button.downloadcsv" })}
                        icon={<DownloadIcon/>}
                        style={style.exportButton}
                        onTouchTap={this.handleExportToCSV}
                    />
                    <RaisedButton
                        primary
                        title={this.props.intl.formatMessage({ "id": "surveyinstancelist.button.newinstance" })}
                        icon={<NewAdhocIcon/>}
                        style={style.newButton}
                        onTouchTap={this.handleCreateNewInstance}
                    />
                </div>

                <div style={style.clearDiv}/>

                <div className="pisa--grid">
                    <Table
                        selectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn tooltip="Created By">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.author" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Submitted By">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.owner" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Submitted By Client">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.client" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Creation Date">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.creation" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Submit Date">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.submit" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Organizational Unit">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.unit" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Answered Questions">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.answered" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Survey Status">
                                    {this.props.intl.formatMessage({ "id": "surveyinstancelist.table.header.status" })}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {/*{this.props.intl.formatMessage({"id": "surveyinstancelist.table.header.actions"})}*/}
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover
                        >
                            {surveyInstanceList && surveyInstanceList.map(( row, index ) => (
                                <TableRow key={uuid.v4()}>
                                    <TableRowColumn
                                        style={{ whiteSpace: "normal" }}
                                    >{row.author ? row.author : "-"}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{ whiteSpace: "normal" }}
                                    >{row.lastEditUser ? row.lastEditUser : "-"}
                                    </TableRowColumn>
                                    <TableRowColumn style={{ whiteSpace: "normal" }}>
                                        <ClientIcon type={row.lastEditClientType}/>
                                        <span
                                            style={{
                                                verticalAlign: "super",
                                                marginLeft: "5px"
                                            }}
                                        >{row.lastEditAddress && row.lastEditAddress !== "UNDEFINED" ? row.lastEditAddress : "-"}</span>
                                    </TableRowColumn>
                                    <TableRowColumn>{row.creationTime ? Moment(row.creationTime).format("DD.MM.YYYY HH:mm:ss").toString() : "-"}</TableRowColumn>
                                    <TableRowColumn>{row.lastEditTime ? Moment(row.lastEditTime).format("DD.MM.YYYY HH:mm:ss").toString() : "-"}</TableRowColumn>
                                    <TableRowColumn>{row.unitName ? row.unitName : "-"}</TableRowColumn>
                                    <TableRowColumn>{row.questionsAnswered + " / " + row.questionsTotal}</TableRowColumn>
                                    <TableRowColumn title={row.status}>
                                        <StatusIcon status={row.status}/>
                                    </TableRowColumn>
                                    <TableRowColumn style={{ overflow: "visible" }}>

                                        <Link to={"/surveyRunner"}>
                                            <IconButton
                                                onTouchTap={() => this.handleLoadInstance(row.instanceId)}
                                                tooltip="Open Survey Runner"
                                                tooltipPosition={index >= surveyInstanceList.length - 1 ? "top-center" : "bottom-center"}
                                            >
                                                <GoToRunnerIcon
                                                    color={grey500}
                                                    hoverColor={greenA200}
                                                />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            onClick={() => this.handleDelete(row.instanceId)}
                                            tooltip="Delete Instance"
                                            tooltipPosition={index >= surveyInstanceList.length - 1 ? "top-center" : "bottom-center"}
                                        >
                                            <DeleteIcon
                                                color={grey500}
                                                hoverColor={greenA200}
                                            />
                                        </IconButton>

                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default injectIntl(withRouter(SurveyInstanceList));
