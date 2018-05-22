import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Separator, Text } from 'native-base';
import SettingNotification from "./SettingNotification";
import IntervalNotification from "./IntervalNotification";
import IntervalLaterNotification from "./IntervalLaterNotification";
import QuickDrinkQuantityList from "./QuickDrinkQuantityList";

class Settings extends Component {

    render() {
        return (
            <List>
                <Separator bordered>
                    <Text>通知设置</Text>
                </Separator>
                <SettingNotification />
                <IntervalNotification />
                <IntervalLaterNotification />
                <QuickDrinkQuantityList />
            </List>
        );
    }
}

export default connect()(Settings);