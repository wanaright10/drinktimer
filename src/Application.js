import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router, { PathEnum } from "./components/route/Router";
import {
    redirectTo,
    saveChartsDrinkQuantity, saveChartsMonthsDrinkQuantity,
    setQuickDrinkQuantityList,
    updateIntervalTime,
    updateNotificationStatus
} from "./actions";
import LocalContainer from "./components/common/LocalContainer";
import { getNotificationPermitAndAddListerner, sendDelayedNotification } from "./components/util/LocalNotifications";
import { IntervalType } from "./components/settings/IntervalInputPage";
import {
    findIntervalTime, findMonthDrinkData,
    findNotificationStatus,
    findQuickDrinkQuantityList,
    findTodayDrinkData
} from "./components/util/DBService";

const store = createStore(allReducers);
store.dispatch(redirectTo(PathEnum.dashboard, PathEnum.dashboard));
export default class Application extends Component {

    componentDidMount() {
        getNotificationPermitAndAddListerner();

        findIntervalTime(IntervalType.INTERVAL_LATER, interval => {
            store.dispatch(updateIntervalTime(IntervalType.INTERVAL_LATER, interval));
        });

        findIntervalTime(IntervalType.INTERVAL, interval => {
            store.dispatch(updateIntervalTime(IntervalType.INTERVAL, interval));
        });

        findQuickDrinkQuantityList(quickDrinkQuantityList => {
            store.dispatch(setQuickDrinkQuantityList(quickDrinkQuantityList));
        });

        findNotificationStatus(status => {
            store.dispatch(updateNotificationStatus(status === 'true'));
        });

        findIntervalTime('interval', time => sendDelayedNotification(Number(time)));

        findTodayDrinkData(drinkQuantity => {
            store.dispatch(saveChartsDrinkQuantity(drinkQuantity));
        });

        findMonthDrinkData(monthsQuantity => {
            store.dispatch(saveChartsMonthsDrinkQuantity(monthsQuantity));
        });
    }

    render() {
        return (
            <Provider store={store}>
                <LocalContainer>
                    <Router />
                </LocalContainer>
            </Provider>
        )
    }
}