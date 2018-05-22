import moment from "moment";
import { TIME_PATTERN } from "../components/util/DBService";

export const CHANGE_PATH = 'CHANGE_PATH';
export const SAVE_CHARTS_DRINK_QUANTITY = 'SAVE_CHARTS_DRINK_QUANTITY';
export const PUSH_ONE_CHARTS_DRINK_QUANTITY = 'PUSH_ONE_CHARTS_DRINK_QUANTITY';
export const UPDATE_NOTIFICATION_STATUS = 'UPDATE_NOTIFICATION_STATUS';
export const UPDATE_INTERVAL_TIME = 'UPDATE_INTERVAL_TIME';
export const PUSH_QUICK_DRINK_QUANTITY_LIST = 'PUSH_QUICK_DRINK_QUANTITY_LIST';
export const SET_QUICK_DRINK_QUANTITY_LIST = 'SET_QUICK_DRINK_QUANTITY_LIST';
export const DELETE_QUICK_DRINK_QUANTITY_LIST = 'DELETE_QUICK_DRINK_QUANTITY_LIST';

export const redirectTo = path => ({
    type: CHANGE_PATH, payload: path,
});

export const saveChartsDrinkQuantity = drinkQuantity => ({
    type: SAVE_CHARTS_DRINK_QUANTITY, payload: drinkQuantity,
});

export const pushOneChartsDrinkQuantity = drinkQuantity => ({
    type: PUSH_ONE_CHARTS_DRINK_QUANTITY, payload: {
        time: moment().format(TIME_PATTERN),
        data: drinkQuantity
    },
});

export const updateNotificationStatus = status => ({
    type: UPDATE_NOTIFICATION_STATUS, payload: status,
});

export const updateIntervalTime = (intervalType, value) => ({
    type: UPDATE_INTERVAL_TIME, payload: { intervalType, value },
});

export const pushQuickDrinkQuantityList = value => ({
    type: PUSH_QUICK_DRINK_QUANTITY_LIST, payload: value,
});

export const setQuickDrinkQuantityList = value => ({
    type: SET_QUICK_DRINK_QUANTITY_LIST, payload: value,
});

export const removeQuickDrinkQuantityList = value => ({
    type: DELETE_QUICK_DRINK_QUANTITY_LIST, payload: value,
});