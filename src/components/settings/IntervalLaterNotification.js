import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Body, Button, Icon, Left, ListItem, Right, Text } from 'native-base';
import ReactPropTypes from "prop-types";
import { redirectTo } from "../../actions";
import { PathEnum } from "../route/Router";

class IntervalLaterNotification extends Component {

    static defaultProps = {
        interval: '10',
    };

    static propTypes = {
        interval: ReactPropTypes.string,
    };

    render() {
        const { interval, dispatch } = this.props;
        return (
            <ListItem icon>
                <Left>
                    <Icon name="timer" />
                </Left>
                <Body>
                <Text>稍后提醒间隔时间</Text>
                </Body>
                <Right>
                    <Button iconRight transparent
                            onPress={() => dispatch(redirectTo(PathEnum.intervalLaterInput, PathEnum.settings))}
                            title="设置">
                        <Text>{interval} 分钟</Text>
                        <Icon name='arrow-forward' />
                    </Button>
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = ({ settings: { intervalLater } }) => ({
    interval: intervalLater,
});

export default connect(mapStateToProps)(IntervalLaterNotification);