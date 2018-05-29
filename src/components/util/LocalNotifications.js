import moment from "moment";
import React from 'react';
import { Alert } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { findIntervalTime, findNotificationStatus } from "./DBService";

const localNotification = {
    title: '该喝水啦!',
    body: '喝水并照顾好自己哦',
    ios: {
        sound: true
    },
    android:
        {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
};

async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

const listenForNotifications = () => {
    Notifications.addListener(notification => {
        if (notification.origin === 'received') {
            Alert.alert('该喝水啦!', '喝水并照顾好自己哦', [
                    {
                        text: '马上喝',
                        onPress: () => {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            findIntervalTime('interval', time => sendDelayedNotification(Number(time)));
                        }
                    },
                    {
                        text: '等会儿再提醒我',
                        onPress: () => {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            findIntervalTime('intervalLater', time => sendDelayedNotification(Number(time)));
                        }
                    },
                ],
                { cancelable: true });
        }
    });
};

export const getNotificationPermitAndAddListerner = () => {
    getiOSNotificationPermission();
    listenForNotifications();
};

export const sendImmediateNotification = () => {
    localNotification.data = { type: 'immediate' };

    Notifications.presentLocalNotificationAsync(localNotification)
        .then(id => console.info(`Immediate notification scheduled (${id})`))
        .catch(err => console.error(err))
};

export const sendDelayedNotification = (minutes, sendDirectly = false) => {
    const sendNotification = () => {
        localNotification.data = { type: 'delayed' };
        const schedulingOptions = {
            time: moment().add(minutes, 'm').valueOf()
        };

        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
            .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
            .catch(err => console.error(err))
    };

    if (sendDirectly) {
        sendNotification();
    } else {
        findNotificationStatus(status => {
            if (status === 'true') {
                sendNotification();
            }
        });
    }
};