import Navigation from "../component/layout/drawer/Navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../services/login";

const mapStateToProps = ( ) => {
    return {
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({
        logout,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
