import { AsyncStorage } from 'react-native';
import moment from 'moment';

export const DATE_PATTERN = 'YYYY-MM-DD';
export const TIME_PATTERN = 'HH:mm';

const DB = {
    save: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    },
    find: async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log("Error finding data" + error);
        }
    },
    delete: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log("Error deleting data" + error);
        }
    },
};

export const findTodayDrinkData = (callBack) => {
    const key = moment().format(DATE_PATTERN);
    DB.find(key).then(todayDataStr => {
        let todayData;
        if (todayDataStr) {
            todayData = JSON.parse(todayDataStr);
        } else {
            todayData = {
                time: [],
                data: []
            };
        }

        if (callBack) {
            callBack(todayData);
        }
    });
};

export const saveCurrentDrinkQuantity = (quantity) => {
    findTodayDrinkData(todayData => {
        todayData.time.push(moment().format(TIME_PATTERN));
        todayData.data.push(Number(quantity));

        const key = moment().format(DATE_PATTERN);
        DB.save(key, JSON.stringify(todayData));
    });
};
