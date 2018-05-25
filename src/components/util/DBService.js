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

export const findMonthDrinkData = callback => {
    AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            // dateQuantityDataObject: { month : totalQuantity}
            const dateQuantityDataObject = stores
                .filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item[0]))
                .map(item => ({
                    date: moment(item[0]), // YYYY-MM-DD
                    data: JSON.parse(item[1]) // {time: HH:mm, data: number}
                }))
                .reduce((resultArray, nextItem) => {
                    const month = `${nextItem.date.month()}`;
                    resultArray[month] = resultArray[month] || 0;
                    resultArray[month] += nextItem.data.data.reduce((totalQuantity, nextTimeQuantity) => totalQuantity + nextTimeQuantity);
                    return resultArray;
                }, {});

            // {month: [number...], quantity: [number...]}
            const result = Object.keys(dateQuantityDataObject).reduce((resultObject, nextMonth) => {
                resultObject.months = resultObject.months || [];
                resultObject.months.push(nextMonth);

                resultObject.quantity = resultObject.quantity || [];
                resultObject.quantity.push(dateQuantityDataObject[nextMonth] / 1000);
                return resultObject;
            }, {});

            result.months.sort((a, b) => a - b);
            result.quantity.sort((a, b) => a - b);

            callback(result);
            // callback({
            //     months:['1','2','3','4','5','6'],
            //     quantity:[1.21,2.4,3.22,2.4,1.6,2.9]
            // });
        });
    });
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
            value = ['50', '100', '150', '200', '250'];
            DB.save(key, JSON.stringify(value));

            callback(value);
        }
    });
};

export const saveQuickDrinkQuantityList = (quantityList) => {
    const key = "quickDrinkQuantityList";
    quantityList.sort((a, b) => a - b);
    DB.save(key, JSON.stringify(quantityList));
};