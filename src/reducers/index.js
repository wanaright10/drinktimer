import { combineReducers } from 'redux';
import { CHANGE_PATH, SAVE_CHARTS_DRINK_QUANTITY, PUSH_ONE_CHARTS_DRINK_QUANTITY } from "../actions";

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

const chartsReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_CHARTS_DRINK_QUANTITY:
            return {
                ...state,
                drinkQuantity: action.payload,
            };
        case PUSH_ONE_CHARTS_DRINK_QUANTITY:
            const { time, data } = state.drinkQuantity;
            time.push(action.payload.time);
            data.push(action.payload.data);
            return {
                ...state,
                drinkQuantity: {
                    time,
                    data
                },
            };
        default:
    }
    return state;
};

const reducers = {
    router: routerReducer,
    charts: chartsReducer,
};
const allReducers = combineReducers(reducers);
export default allReducers;