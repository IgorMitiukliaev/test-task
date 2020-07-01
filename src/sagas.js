import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {LOAD_DATA, SET_ACTIVE_TAB, SET_ACTIVE_TAGS, TOGGLE_TAG} from "./constants/ActionTypes";
import {action} from "./store";

function fetchItems() {
    const BASE_URL = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
    return fetch(BASE_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => (data.items)
        );
}

function pushTabChangeToHistory(action) {
    const activeTab = action.tab;
    console.log(activeTab);
    const params = new URLSearchParams(window.location.search);
    const activeTagsString = params.get('tags');
    const activeTags = !!activeTagsString ? activeTagsString.split(',').filter(tag => tag.length > 0) : [];
    console.log(`/?tab=${activeTab}&tags=${activeTags}`);
    window.history.pushState({activeTab, activeTags}, '', `/?tab=${activeTab}&tags=${activeTags}`);
}

function pushTagsChangeToHistory(action) {
    const params = new URLSearchParams(window.location.search);
    const activeTagsString = params.get('tags');
    console.log(activeTagsString);
    const activeTags = !!activeTagsString ? activeTagsString.split(',').filter(tag => tag.length > 0) : [];
    const activeTab = params.get('tab');
    const index = activeTags.indexOf(action.tag);
    index >= 0 ? activeTags.splice(index, 1) : activeTags.push(action.tag);
    console.log(`/?tab=${activeTab}&tags=${activeTags}`);
    window.history.pushState({activeTab, activeTags}, '', `/?tab=${activeTab}&tags=${activeTags}`);
}

function* pushToHistory() {
    yield takeEvery('SET_ACTIVE_TAB', pushTabChangeToHistory);
    yield takeEvery('TOGGLE_TAG', pushTagsChangeToHistory);
}

export function* fetchData() {
    try {
        const items = yield call(fetchItems);
        yield put({type: LOAD_DATA, items: items});
    } catch (e) {
        yield put({type: "DATA_FETCH_FAILED", message: e.message});
    }
}

export function* rootSaga(pattern, worker) {
    yield all([fetchData(), pushToHistory()]);

}