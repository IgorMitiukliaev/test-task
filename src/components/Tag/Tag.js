import React from 'react'
import './tag.css'
import {toggleTag} from "../../actions";
import {connect} from "react-redux";

const Tag = (props) => {
    const {tag, toggleTag} = {...props};
    return (
        <span
            className='tagLabel'
            onClick={()=>{toggleTag(tag)}}>
            {`#${tag}`}
        </span>
    )

};

const mapStateToProps = state => ({
    activeTags: state.activeTags
});

const mapDispatchToProps = {toggleTag};

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
