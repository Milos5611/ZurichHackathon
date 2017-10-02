import {
    TEMPLATES
} from "../services/template";
import Templates from "../component/view/Templates/Templates";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [TEMPLATES]: state.template[ TEMPLATES ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
