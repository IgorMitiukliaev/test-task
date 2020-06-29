import {NavItem, NavLink} from "reactstrap";
import React from "react";
import {connect} from 'react-redux'
import {setActiveTab} from '../../actions'

const TabHeader = (props) => {
    const {name, activeTab, setActiveTab, tabItemsCounter} = {...props};
    return (
        <NavItem>
            <NavLink
                className={(activeTab === name) ? 'active' : null}
                onClick={() => setActiveTab(name)}
            >{name} ({tabItemsCounter[name]})</NavLink>
        </NavItem>)
};

const mapStateToProps = state => ({
    activeTab: state.activeTab,
    tabItemsCounter: state.tabItemsCounter
});

const mapDispatchToProps = {setActiveTab};

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)