import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import React from "react";

const toolbarStyle = {
    backgroundColor: "rgb(0, 188, 212)"
};

const toolbarTitleStyle = {
    color: "white",
    paddingLeft: 20
};

const Header = () => (
    <Toolbar
        style={toolbarStyle}
        className="header"
    >

        <ToolbarGroup firstChild>
            <ToolbarTitle
                style={toolbarTitleStyle}
                text="Monitoring & Evaluating Your Refunds"
            />

        </ToolbarGroup>

        <ToolbarGroup>
            <ToolbarTitle
                style={{ color: "white" }}
                text={"HACK THE PLANET "}
            />
        </ToolbarGroup>

        <ToolbarGroup lastChild>
            <ToolbarTitle
                style={toolbarTitleStyle}
                text={"Version: 0.1"}
            />
        </ToolbarGroup>

    </Toolbar>
);

export default Header;
