import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import App from './components/AppComponent/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {store} from './store'
import {createBrowserHistory as createHistory} from 'history';

const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Route path="/" component={App}/>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
