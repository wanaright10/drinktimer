import { combineReducers } from 'redux';
import { CHANGE_PATH } from "../actions";

const routerReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_PATH:
            return {
                ...state,
                currentPath: action.payload,
            };
        default:
    }
    return state;
};

const reducers = {
    router: routerReducer,
};
const allReducers = combineReducers(reducers);
export default allReducers;