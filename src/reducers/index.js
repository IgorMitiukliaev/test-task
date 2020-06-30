import '../constants/ActionTypes'
import {
    FETCH_DATA,
    LOAD_DATA,
    TOGGLE_TAG,
    CHANGE_ITEM_STATUS,
    SET_ACTIVE_TAB,
    CLEAR_ACTIVE_TAGS
} from "../constants/ActionTypes";
import {readStatus} from "../actions";

export const initialState =
    {
        items: [],
        itemsToRead: [],
        itemsInProgress: [],
        itemsDone: [],
        activeTags: [],
        activeTab: readStatus.TO_READ,
        tabItemsCounter: {
            [readStatus.TO_READ]: 0,
            [readStatus.IN_PROGRESS]: 0,
            [readStatus.DONE]: 0
        }
    };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA: {
            return {
                ...state,

            };

        }

        case LOAD_DATA: {
            const {items} = {...action};
            const itemsToRead = items.map(item => item.id);
            return {
                ...state,
                items: [...items],
                itemsToRead,
                tabItemsCounter: {
                    [readStatus.TO_READ]: items.length,
                    [readStatus.IN_PROGRESS]: 0,
                    [readStatus.DONE]: 0
                }
            }
        }

        case
        SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.tab
            };

        case
        TOGGLE_TAG: {
            const {activeTags = []} = {...state};
            const {tag} = {...action};
            const tagIndexAmongActives = activeTags.indexOf(tag);
            (tagIndexAmongActives >= 0) ?
                activeTags.splice(tagIndexAmongActives, 1) :
                activeTags.push(tag);
            activeTags.sort();
            return {
                ...state,
                activeTags
            };
        }

        case
        CHANGE_ITEM_STATUS: {
            const {item, status} = {...action};
            const itemsToRead = [...state.itemsToRead];
            const itemsInProgress = [...state.itemsInProgress];
            const itemsDone = [...state.itemsDone];

            switch (status) {
                case readStatus.TO_READ: {
                    const indexInCurrentStatus = itemsToRead.indexOf(item.id);
                    itemsToRead.splice(indexInCurrentStatus, 1);
                    itemsInProgress.push(item.id);
                    break;
                }
                case readStatus.IN_PROGRESS: {
                    const indexInCurrentStatus = itemsInProgress.indexOf(item.id);
                    itemsInProgress.splice(indexInCurrentStatus, 1);
                    itemsDone.push(item.id);
                    break;
                }
                case readStatus.DONE: {
                    const indexInCurrentStatus = itemsDone.indexOf(item);
                    itemsDone.splice(indexInCurrentStatus, 1);
                    itemsToRead.push(item.id);
                    break;
                }
                default:
                    return;
            }

            const tabItemsCounter = {};
            tabItemsCounter[readStatus.TO_READ] = itemsToRead.length;
            tabItemsCounter[readStatus.IN_PROGRESS] = itemsInProgress.length;
            tabItemsCounter[readStatus.DONE] = itemsDone.length;

            return {
                ...state,
                itemsToRead: [...itemsToRead],
                itemsInProgress: [...itemsInProgress],
                itemsDone: [...itemsDone],
                tabItemsCounter: {...tabItemsCounter}
            };
        }

        case
        CLEAR_ACTIVE_TAGS: {
            return {
                ...state,
                activeTags: []
            }
        }

        default:
            return state
    }
}