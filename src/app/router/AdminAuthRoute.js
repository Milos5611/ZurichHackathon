import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import * as ROUTES from "../common/routes";
import {isLoggedIn} from "./selectors/auth";
import {isAdmin} from "./selectors/isAdmin";

const AdminAuthRoute = ({component: Component, isLoggedIn, isAdmin, ...rest}) => {
	const renderFn = props => {
		if (isLoggedIn && isAdmin) {
			return <Component {...props}/>;
		}

		return <Redirect to={ROUTES.DEFAULT_LOGGED_IN} />
	};

	return <Route {...rest} render={renderFn}/>;
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: isLoggedIn(state),
		isAdmin: isAdmin(state)
	};
};

export default withRouter(connect(mapStateToProps)(AdminAuthRoute));
