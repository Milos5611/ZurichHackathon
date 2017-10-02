import { LANGUAGE, LANGUAGE_LIST, changeLanguage, loadLanguageList } from "../services/languageList";

import LanguageSelection from "../component/widget/languageSelection/LanguageSelection";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        [LANGUAGE_LIST]: state.languageList[ LANGUAGE_LIST ],
        [LANGUAGE]: state.languageList[ LANGUAGE ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({
        changeLanguage,
        loadLanguageList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelection);
