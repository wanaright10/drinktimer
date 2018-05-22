import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Body, Icon, Left, ListItem, Right, Switch, Text } from 'native-base';
import ReactPropTypes from "prop-types";
import { saveNotificationStatus } from "../util/DBService";
import { updateNotificationStatus } from "../../actions";

class SettingNotification extends Component {

    static defaultProps = {
        notificationStatus: true,
    };

    static propTypes = {
        notificationStatus: ReactPropTypes.bool,
    };

    onSwitchChange = value => {
        saveNotificationStatus(value);
        this.props.dispatch(updateNotificationStatus(value));
    };

    render() {
        const { notificationStatus } = this.props;
        return (
            <ListItem icon>
                <Left>
                    <Icon name="notifications" />
                </Left>
                <Body>
                <Text>开启通知</Text>
                </Body>
                <Right>
                    <Switch value={notificationStatus} onValueChange={this.onSwitchChange} />
                </Right>
            </ListItem>

        );
    }
}

const mapStateToProps = ({ settings: { notificationStatus } }) => ({
    notificationStatus,
});

export default connect(mapStateToProps)(SettingNotification);