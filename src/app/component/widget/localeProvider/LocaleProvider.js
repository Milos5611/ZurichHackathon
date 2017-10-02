import { IntlProvider } from "react-intl";
import PropTypes from "prop-types";
import React from "react";

//localization
import deMessages from "../../../common/i18n/messagesDe";
import enMessages from "../../../common/i18n/messagesEn";

const DE = "de";
const EN = "en";
const supportedLanguages = [];

supportedLanguages[ DE ] = deMessages;
supportedLanguages[ EN ] = enMessages;

const getMessages = ( language ) => {
    const messages = supportedLanguages[ language ];
    return messages ? messages : supportedLanguages[ DE ];
};

//this if is a Safari hack. Because safari doesn't support by default Intl.
//more about this topic: https://github.com/andyearnshaw/Intl.js/
if ( !window.intl ) {
    window.intl = require("intl");
    window.intl.polyFill = true;
    require("intl/locale-data/jsonp/en.js");
    require("intl/locale-data/jsonp/de.js");
}

const LocaleProvider = ( { language, children } ) => {
    return (
        <IntlProvider
            locale={!language ? "en" : language}
            defaultLocale="en"
            messages={getMessages(language)}
        >
            {children}
        </IntlProvider>);
};

LocaleProvider.propTypes = {
    "language": PropTypes.string.isRequired,
    "children": PropTypes.element
};

LocaleProvider.defaultProps = {
    language : "en"
};

export default LocaleProvider;

