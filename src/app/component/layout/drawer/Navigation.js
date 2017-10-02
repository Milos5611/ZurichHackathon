/* eslint-disable react/no-set-state,react/jsx-no-bind */
import { Cookies, withCookies } from "react-cookie";
import AggregatedReportIcon from "material-ui/svg-icons/action/view-list";
import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";
import { COOKIE_LOGIN } from "../../../services/login";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import DataCollectionIcon from "material-ui/svg-icons/action/question-answer";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IndicatorIcon from "material-ui/svg-icons/action/aspect-ratio";
import IndicatorReportIcon from "material-ui/svg-icons/editor/pie-chart";
import InfoIcon from "material-ui/svg-icons/action/info-outline";
import { Link } from "react-router-dom";
import LogoutIcon from "material-ui/svg-icons/action/power-settings-new";
import { Menu } from "material-ui";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import ReportIcon from "material-ui/svg-icons/editor/insert-chart";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import SurveyReportIcon from "material-ui/svg-icons/editor/show-chart";
import TemplateEditorIcon from "material-ui/svg-icons/action/dns";
import UserManagementIcon from "material-ui/svg-icons/social/group";

class Navigation extends React.Component {

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired,
        logout: PropTypes.func.isRequired
    };

    constructor( props ) {
        super(props);
        this.state = { open: false };
        this.handleLogout = :: this.handleLogout;
        this.handleToggle = :: this.handleToggle;
        this.handleClose = :: this.handleClose;
    }

    handleLogout() {
        this.props.cookies.remove(COOKIE_LOGIN);
        this.props.logout();
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>

                <div className="drawer--button">
                    <FloatingActionButton
                        mini
                        zDepth={0}
                        backgroundColor={"#A0C52A"}
                        onClick={this.handleToggle}
                    >
                        <MenuIcon/>
                    </FloatingActionButton>
                </div>

                <Drawer
                    docked={false}
                    width={260}
                    backgroundColor={"#A0C52A"}
                    open={this.state.open}
                    onRequestChange={( open ) => this.setState({ open })}
                >
                    <Menu
                        desktop
                        style={{width:"250px"}}
                    >
                        <MenuItem
                            primaryText="Dashboard"
                            leftIcon={<DashboardIcon/>}
                            onClick={this.handleClose}
                        />

                        <Divider/>

                        <MenuItem
                            containerElement={<Link to="/surveys"/>}
                            primaryText="Data Collection"
                            leftIcon={<DataCollectionIcon/>}
                            onClick={this.handleClose}
                        />

                        <Divider/>

                        <MenuItem
                            leftIcon={<ReportIcon/>}
                            rightIcon={<ArrowDropRight/>}
                            primaryText="Reports"

                            menuItems={[
                                <MenuItem
                                    key="first"
                                    leftIcon={<IndicatorReportIcon/>}
                                    primaryText="Indicator Reports"
                                    onClick={this.handleClose}
                                />,
                                <MenuItem
                                    key="second"
                                    leftIcon={<AggregatedReportIcon/>}
                                    primaryText="Program Reports"
                                    onClick={this.handleClose}
                                />,
                                <MenuItem
                                    key="third"
                                    leftIcon={<SurveyReportIcon/>}
                                    primaryText="Survey Reports"
                                    onClick={this.handleClose}
                                />
                            ]}
                        />

                        <Divider/>

                        <MenuItem
                            leftIcon={<SettingsIcon/>}
                            rightIcon={<ArrowDropRight/>}
                            primaryText="Administration"
                            menuItems={[
                                <MenuItem
                                    key="first"
                                    containerElement={<Link to="/templates"/>}
                                    leftIcon={<TemplateEditorIcon/>}
                                    primaryText="Template Editor"
                                    onClick={this.handleClose}
                                />,
                                <MenuItem
                                    key="second"
                                    containerElement={<Link to="/indicators"/>}
                                    leftIcon={<IndicatorIcon/>}
                                    primaryText="Indicator Managment"
                                    onClick={this.handleClose}
                                />,
                                <MenuItem
                                    key="third"
                                    containerElement={<Link to="/users"/>}
                                    leftIcon={<UserManagementIcon/>}
                                    primaryText="User Management"
                                    onClick={this.handleClose}
                                />
                            ]}
                        />

                        <Divider/>
                    </Menu>

                    <div className="drawer--logo"/>

                    <Menu
                        desktop
                        style={{width:"250px"}}
                        className="drawer--bottomMenu"
                    >

                        <Divider/>

                        <MenuItem
                            primaryText="About"
                            leftIcon={<InfoIcon/>}
                        />

                        <Divider/>

                        <MenuItem
                            containerElement={<Link to="/"/>}
                            primaryText="Logout"
                            leftIcon={<LogoutIcon/>}
                            onClick={this.handleLogout}
                        />

                    </Menu>
                </Drawer>
            </div>
        );
    }
}

export default withCookies(Navigation);
