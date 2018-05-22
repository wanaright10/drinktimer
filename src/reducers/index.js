import { combineReducers } from 'redux';
import {
    CHANGE_PATH,
    SAVE_CHARTS_DRINK_QUANTITY,
    PUSH_ONE_CHARTS_DRINK_QUANTITY,
    UPDATE_NOTIFICATION_STATUS,
    UPDATE_INTERVAL_TIME,
    PUSH_QUICK_DRINK_QUANTITY_LIST,
    DELETE_QUICK_DRINK_QUANTITY_LIST,
    SET_QUICK_DRINK_QUANTITY_LIST
} from "../actions";
import { IntervalType } from "../components/settings/IntervalInputPage";

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

const settingsReducer = (state = {}, action) => {
    const { quickDrinkQuantityList = [] } = state;
    switch (action.type) {
        case UPDATE_NOTIFICATION_STATUS:
            return {
                ...state,
                notificationStatus: action.payload,
            };
        case UPDATE_INTERVAL_TIME:
            const { intervalType, value } = action.payload;
            if (intervalType === IntervalType.INTERVAL) {
                return {
                    ...state,
                    interval: value
                }
            } else if (intervalType === IntervalType.INTERVAL_LATER) {
                return {
                    ...state,
                    intervalLater: value
                }
            }
            return state;
        case PUSH_QUICK_DRINK_QUANTITY_LIST:
            quickDrinkQuantityList.push(action.payload);

            return {
                ...state,
                quickDrinkQuantityList
            };
        case DELETE_QUICK_DRINK_QUANTITY_LIST:
            return {
                ...state,
                quickDrinkQuantityList: quickDrinkQuantityList.filter(item => item !== action.payload)
            };
        case SET_QUICK_DRINK_QUANTITY_LIST:
            return {
                ...state,
                quickDrinkQuantityList: action.payload
            };
        default:
    }
    return state;
};

const reducers = {
    router: routerReducer,
    charts: chartsReducer,
    settings: settingsReducer,
};
const allReducers = combineReducers(reducers);
export default allReducers;