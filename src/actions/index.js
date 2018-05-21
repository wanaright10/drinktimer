import moment from "moment";
import { TIME_PATTERN } from "../components/util/DBService";

export const CHANGE_PATH = 'CHANGE_PATH';
export const SAVE_CHARTS_DRINK_QUANTITY = 'SAVE_CHARTS_DRINK_QUANTITY';
export const PUSH_ONE_CHARTS_DRINK_QUANTITY = 'PUSH_ONE_CHARTS_DRINK_QUANTITY';

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