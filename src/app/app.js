import "./index.scss";
import * as ROUTES from "../app/common/routes";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AnonRoute from "./router/AnonRoute";
import AuthRoute from "./router/AuthRoute";
import { CookiesProvider } from "react-cookie";
import Listener from "../listener/listener";
import LoadingSpinner from "./container/LoadingSpinnerContainer";
import Login from "./container/Login";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Notification from "./container/Notification";
import { Provider } from "react-redux";
import React from "react";
import Template from "./container/Template";
import { addLocaleData } from "react-intl";
import de from "react-intl/locale-data/de";
import domready from "domready";
import en from "react-intl/locale-data/en";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { render } from "react-dom";
import store from "./common/store";

addLocaleData([ ...de, ...en ]);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const MainApplication = () => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Provider store={store}>
                <Router>
                    <div>
                        <LoadingSpinner/>
                        <Switch>
                            <AuthRoute
                                exact
                                path={ROUTES.TEMPLATES}
                                component={Template}
                            />
                            <AnonRoute
                                path={ROUTES.HOME}
                                component={Login}
                            />

                        </Switch>
                        <Route component={Notification}/>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
};

domready(() => {
    render(
        <Listener>
            <CookiesProvider>
                <MainApplication/>
            </CookiesProvider>
        </Listener>, document.getElementById("app"));
});
