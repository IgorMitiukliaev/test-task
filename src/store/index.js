import reducer from '../reducers'
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "../sagas";
import {initialState} from "../reducers";
import {composeWithDevTools} from 'redux-devtools-extension'


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export const action = type => store.dispatch(type);