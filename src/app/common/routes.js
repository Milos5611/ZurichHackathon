export const HOME = "/";
export const REGISTRATION = "/registration";
export const TEMPLATES = "/templates";
export const LETTER = "/templates/:id/letter";
export const CACHE = "/templates/:id/cache";
export const CONTRACT = "/templates/:id/contract";
export const surveyInstances = ( id ) => {
    return "/templates/" + id + "/detail";
};

export const DEFAULT_LOGGED_IN = HOME;
export const DEFAULT_ANONYMOUS = HOME;
export const DEFAULT_ADMIN = TEMPLATES;
