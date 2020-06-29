import React from 'react';
import './App.css';
import {Nav} from 'reactstrap'
import {connect} from 'react-redux'
import ItemsList from '../ItemsList/ItemsList'
import ActiveTags from "../ActiveTags/ActiveTags";
import TabHeader from "../TabHeader/TabHeader";
import {loadData, readStatus} from '../../actions'
import {setURLParams} from '../../services'

class App extends React.Component {

    componentWillMount() {
        const {loadData} = {...this.props};
        const BASE_URL = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
        fetch(BASE_URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                loadData(data.items);
            });
    }

    shouldComponentUpdate(newProps) {
        const {activeTab, activeTags} = newProps;
        setURLParams({activeTab, activeTags});
        console.log(this.props.location.search);
        return this.props.activeTab===activeTab;

    }

    render() {
        return (
            <div className="App">
                <Nav tabs className='nav-fill'>
                    <TabHeader name={readStatus.TO_READ}/>
                    <TabHeader name={readStatus.IN_PROGRESS}/>
                    <TabHeader name={readStatus.DONE}/>
                </Nav>
                <ActiveTags/>
                <ItemsList/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    itemsReadStatus: state.itemsReadStatus,
    activeTab: state.activeTab,
    activeTags: state.activeTags,
});

const mapDispatchToProps = {loadData};

export default connect(mapStateToProps,mapDispatchToProps)(App)

