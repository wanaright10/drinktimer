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

export const findNotificationStatus = (callback) => {
    const key = 'notificationsStatus';
    DB.find(key).then(value => {
        if (value) {
            callback(value);
        } else {
            DB.save(key, 'true');
        }
    });
};

export const saveNotificationStatus = (status) => {
    const key = 'notificationsStatus';
    DB.save(key, '' + status)
};

export const findIntervalTime = (intervalType, callback) => {
    DB.find(intervalType).then(value => {
        if (value) {
            callback(value);
        } else {
            DB.save(intervalType, '60');
        }
    });
};

export const saveIntervalTime = (intervalType, value) => {
    DB.save(intervalType, value);
};

export const findQuickDrinkQuantityList = callback => {
    const key = "quickDrinkQuantityList";
    DB.find(key).then(value => {
        if (value) {
            callback(JSON.parse(value));
        } else {
            DB.save(key, JSON.stringify(['50', '100', '150', '200', '250']));
        }
    });
};

export const saveQuickDrinkQuantityList = (quantityList) => {
    const key = "quickDrinkQuantityList";
    DB.save(key, JSON.stringify(quantityList));
};