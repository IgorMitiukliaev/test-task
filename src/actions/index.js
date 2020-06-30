import * as types from "../constants/ActionTypes";

export const fetchData = () => ({type: types.FETCH_DATA});
export const loadData = (items) => ({type: types.LOAD_DATA, items});
export const setActiveTab = (tab) => ({type: types.SET_ACTIVE_TAB, tab});
export const toggleTag = (tag) => ({type: types.TOGGLE_TAG, tag});
export const changeItemStatus = (status, item) => ({
    type: types.CHANGE_ITEM_STATUS,
    status,
    item
});
export const clearActiveTags = () => ({type: types.CLEAR_ACTIVE_TAGS});

export const readStatus = {
    TO_READ: 'To read',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
};

export const fetchStatus = {
    NOT_LOADED: 'NOT_LOADED',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};