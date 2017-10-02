import { LANGUAGE } from "../../../services/languageList";
import LocaleProvider from "./LocaleProvider";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [LANGUAGE]: state.languageList[ LANGUAGE ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LocaleProvider);


