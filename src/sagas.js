import {call, put, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {LOAD_DATA} from "./constants/ActionTypes";

function fetchItems() {
    const BASE_URL = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
    return fetch(BASE_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => (data.items)
        );
}

export function* fetchData(action) {
    try {
        const items = yield call(fetchItems);
        yield put({type: LOAD_DATA, items: items});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

export function* rootSaga() {
    yield all([fetchData()])
}