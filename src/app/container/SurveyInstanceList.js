import {
    SURVEY,
    SURVEY_INSTANCE_INVITATION_DIALOG_OPEN,
    SURVEY_INSTANCE_LIST,
    closeInvitationDialog,
    createSurveyInstance,
    deleteSurveyInstance,
    loadSurvey,
    loadSurveyInstanceListFilter,
    openInvitationDialog
} from "../services/surveylist";
import SurveyInstanceList from "../component/view/surveyInstanceList/SurveyInstanceList";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        [SURVEY_INSTANCE_LIST]: state.surveyList[SURVEY_INSTANCE_LIST],
        [SURVEY]: state.surveyList[SURVEY],
        [SURVEY_INSTANCE_INVITATION_DIALOG_OPEN]: state.surveyList[ SURVEY_INSTANCE_INVITATION_DIALOG_OPEN ]
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadSurveyInstanceListFilter,
        loadSurvey,
        createSurveyInstance,
        deleteSurveyInstance,
        openInvitationDialog,
        closeInvitationDialog
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyInstanceList);
