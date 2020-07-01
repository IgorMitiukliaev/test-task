import React from 'react'
import {connect} from "react-redux";
import Item from "../Item/Item";
import {fetchData, setActiveTab, setActiveTags, readStatus} from "../../actions";


class ItemsList extends React.Component {
    componentDidMount() {
        window.addEventListener("popstate", e => this.getURLParams(e));
    }

    getURLParams(event) {
        console.log('back / forward')
        //TODO  on popstate should read tab/tags from event.state and re-render - HOW?
    }

    render() {
        const {items, activeTab, activeTags, itemsToRead, itemsInProgress, itemsDone} = {...this.props};

        const getArraysIntersection = (array1, array2) => {
            if (array2.length > 0) {
                return array1.filter(value => array2.includes(value))
            }
            return array1;
        };

        let itemsToDisplay;
        switch (activeTab) {
            case readStatus.DONE: {
                itemsToDisplay = [...itemsDone];
                break;
            }
            case readStatus.IN_PROGRESS: {
                itemsToDisplay = [...itemsInProgress];
                break;
            }
            case readStatus.TO_READ: {
                itemsToDisplay = [...itemsToRead];
                break;
            }
            default: {
                return;
            }
        }

        let visibleItems = items
            .filter(item => {
                return itemsToDisplay.includes(item.id)
            })
            .filter(item => {
                return getArraysIntersection(item.tags, activeTags).length >= activeTags.length;
            });

        return (
            visibleItems.length > 0 ?
                visibleItems.map(e => <Item key={e.id} {...e} />) :
                <div style={{
                    textAlign: 'center',
                    margin: '20px auto'
                }}>List is empty</div>
        )
    }
}


const mapStateToProps = state => ({
    items: [...state.items],
    activeTab: state.activeTab,
    activeTags: [...state.activeTags],
    itemsToRead: state.itemsToRead,
    itemsInProgress: state.itemsInProgress,
    itemsDone: state.itemsDone,
});

const mapDispatchToProps = {fetchData, setActiveTab, setActiveTags};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);

