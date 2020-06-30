import React from 'react';
import './App.css';
import {Nav} from 'reactstrap'
import {connect} from 'react-redux'
import ItemsList from '../ItemsList/ItemsList'
import ActiveTags from "../ActiveTags/ActiveTags";
import TabHeader from "../TabHeader/TabHeader";
import {BrowserRouter as Router} from "react-router-dom";
import {loadData, readStatus} from '../../actions'


class App extends React.Component {

    render() {

        return (
            <Router>
                <div className="App">
                    <Nav tabs className='nav-fill'>
                        <TabHeader name={readStatus.TO_READ}/>
                        <TabHeader name={readStatus.IN_PROGRESS}/>
                        <TabHeader name={readStatus.DONE}/>
                    </Nav>
                    <ActiveTags/>
                    <ItemsList/>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    itemsReadStatus: state.itemsReadStatus,
    activeTab: state.activeTab,
    activeTags: state.activeTags,
});

const mapDispatchToProps = {loadData};

export default connect(mapStateToProps, mapDispatchToProps)(App)

