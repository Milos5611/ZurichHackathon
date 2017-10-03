import {
    TEMPLATES,
    getAllTemplates
} from "../services/template";
import TemplateCache from "../component/view/Templates/TemplateCache";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [TEMPLATES]: state.template[ TEMPLATES ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ getAllTemplates }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateCache);
