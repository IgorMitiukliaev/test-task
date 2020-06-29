import React from 'react';
import {connect} from 'react-redux'
import {clearActiveTags} from '../../actions'
import Tag from "../Tag/Tag";

const ActiveTags = (props) => {
    const {activeTags, clearActiveTags} = {...props};

    if (activeTags.length > 0) {
        const tagLabel = activeTags.map((e) => <Tag key={e} tag={e}/>);

        return (
            <div style={{margin: '20px 5px 10px 5px'}}>
                Filtered by tags: {tagLabel} <span onClick={clearActiveTags}>(clear)</span>
                <hr/>
            </div>
        )
    }
    return null
};

const mapStateToProps = state => ({
    activeTags: [...state.activeTags]
});

const mapDispatchToProps = {clearActiveTags};

export default connect(mapStateToProps,mapDispatchToProps)(ActiveTags)