import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import React from "react";

const styles = {
    customWidth: {
        width: 200,
    },
};

export default class LanguageSelection extends PureComponent {

    static propTypes = {
        "languageList": PropTypes.array,
        "language": PropTypes.string,
        "loadLanguageList": PropTypes.func,
        "changeLanguage": PropTypes.func
    };

    static defaultProps = {
        "language": "en"
    };

    constructor( props ) {
        super(props);
        this.handleChange = ::this.handleChange;
    }

    componentDidMount() {
        const { loadLanguageList } = this.props;
        loadLanguageList();
    }

    handleChange( event, index, value ) {
        const { changeLanguage } = this.props;
        changeLanguage(value);
    }

    render() {
        return (
            <div>
                <DropDownMenu
                    labelStyle={{ color: "white" }}
                    className="pisa--languageselection"
                    value={this.props.language}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                    {this.props.languageList && this.props.languageList.map(( row ) => (
                        <MenuItem
                            key={row.id}
                            value={row.id ? row.id.substring(0, row.id.indexOf("_")) : null}
                            primaryText={row.name}
                        />
                    ))}
                </DropDownMenu>
            </div>
        );
    }
}
