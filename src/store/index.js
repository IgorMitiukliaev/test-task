import reducer from '../reducers'
import {createStore} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import {initialState} from "../reducers";





export const store = createStore(reducer,   initialState,  devToolsEnhancer());