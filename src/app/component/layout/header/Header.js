import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import LanguageSelection from "../../../container/LanguageSelection";
import Moment from "moment";
import Navigation from "../../../container/Navigation";
import PropTypes from "prop-types";
import React from "react";

const toolbarStyle = {
    backgroundColor: "#A0C52A"
};

const toolbarTitleStyle = {
    color: "white"
};

const Header = ( { showPage, title, showLanguage, updated,version } ) => (
    <Toolbar
        style={toolbarStyle}
        className="header"
    >

        {showPage ?
            <ToolbarGroup firstChild>

                <Navigation/>

                <div className="header--logo"/>

                <ToolbarTitle
                    style={toolbarTitleStyle}
                    text="Monitoring & Evaluation"
                />

            </ToolbarGroup> : null
        }

        {title ?
            <ToolbarGroup>
                <ToolbarTitle
                    style={toolbarTitleStyle}
                    text={`Title: ${title}`}
                />
            </ToolbarGroup> : null
        }

        {version ?
            <ToolbarGroup>
                <ToolbarTitle
                    style={toolbarTitleStyle}
                    text={`Version: ${version}`}
                />
            </ToolbarGroup> : null
        }

        {updated ?
            <ToolbarGroup>
                <ToolbarTitle
                    style={toolbarTitleStyle}
                    text={`Last Update: ${Moment(updated).format("MM/DD/YYYY").toString()}`}
                />
            </ToolbarGroup> : null
        }

        {showLanguage ?
            <ToolbarGroup>
                <LanguageSelection/>
            </ToolbarGroup> : null
        }
    </Toolbar>
);

Header.propTypes = {
    title: PropTypes.string,
    showPage: PropTypes.bool,
    showLanguage: PropTypes.bool,
    updated: PropTypes.number,
    version: PropTypes.number
};

export default Header;
