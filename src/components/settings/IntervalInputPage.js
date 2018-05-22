import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import ReactPropTypes from "prop-types";
import styles from "../dashboard/Styles";
import { saveIntervalTime } from "../util/DBService";
import { redirectTo, updateIntervalTime } from "../../actions";
import { PathEnum } from "../route/Router";

export const IntervalType = {
    INTERVAL: 'interval',
    INTERVAL_LATER: 'intervalLater'
};

class IntervalInput extends Component {

    static propTypes = {
        interval: ReactPropTypes.string,
        intervalType: ReactPropTypes.oneOf([IntervalType.INTERVAL, IntervalType.INTERVAL_LATER]),
    };

    constructor() {
        super();
        this.state = {
            invalidInput: false,
        }
    }

    changeInput = value => {
        if (value === '' || /^\d+$/.test(value)) {
            this.setState({ interval: value });
            this.setState({ invalidInput: false });
        } else {
            this.setState({ invalidInput: true });
        }
    };

    clickButton = () => {
        if (!this.state.invalidInput) {
            const { intervalType, dispatch } = this.props;
            const interval = this.state.interval || this.props.interval;
            saveIntervalTime(intervalType, interval);
            dispatch(updateIntervalTime(intervalType, interval));
            dispatch(redirectTo(PathEnum.settings));
        }
    };

    render() {
        return (
            <Form>
                <Item fixedLabel error={this.state.invalidInput}>
                    <Label>间隔分钟数</Label>
                    <Input onChangeText={(value) => this.changeInput(value)}
                           value={this.props.interval} />
                </Item>
                <Button full onPress={this.clickButton} title="确定" style={styles.marginTop30}>
                    <Text>确定</Text>
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = ({ settings: { interval, intervalLater } }, { intervalType }) => {
    if (intervalType === IntervalType.INTERVAL) {
        return {
            interval,
        }
    } else if (intervalType === IntervalType.INTERVAL_LATER) {
        return {
            interval: intervalLater,
        }
    }
    return {
        interval: 60,
    }
};

export default connect(mapStateToProps)(IntervalInput);