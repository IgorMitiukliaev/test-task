import React from "react";
import {changeItemStatus} from "../../actions";
import {connect} from "react-redux";
import {readStatus} from "../../actions";


const ChangeStatusLabel = (props) => {

    const {activeTab, changeItemStatus, item} = props;
    let label;
    switch (activeTab) {
        case readStatus.TO_READ: {
            label = 'start reading';
            break;
        }
        case readStatus.IN_PROGRESS: {
            label = 'finish reading';
            break;
        }
        case readStatus.DONE: {
            label = `return in "to read"`;
            break;
        }
        default:
            break;
    }


    return (
        <p onClick={() => changeItemStatus(activeTab, item)}>{label}</p>)
};

const mapStateToProps = state => ({
    activeTab: state.activeTab
});

const mapDispatchToProps = {changeItemStatus};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusLabel)