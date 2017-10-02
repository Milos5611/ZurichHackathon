export const HOME = "/";
export const TEMPLATES = "/templates";
export const SURVEYS = "/surveys";
export const SURVEY_RUNNER = "/surveyRunner";
export const SURVEY_INSTANCE_LIST = "/surveys/:surveyGid/instances";
export const USERS = "/users";
export const surveyInstances = ( surveyGid ) => {
    return "/surveys/" + surveyGid + "/instances";
};

export const DEFAULT_LOGGED_IN = HOME;
export const DEFAULT_ANONYMOUS = HOME;
export const DEFAULT_ADMIN = TEMPLATES;
