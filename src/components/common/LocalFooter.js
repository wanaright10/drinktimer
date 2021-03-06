import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import { redirectTo } from "../../actions";
import { PathEnum } from "../route/Router";
import { connect } from "react-redux";

class LocalFooter extends Component {
    static defaultProps = {
        currentPath: PathEnum.dashboard,
    };

    static propTypes = {
        currentPath: ReactPropTypes.string,
        dispatch: ReactPropTypes.func.isRequired,
    };

    render() {
        const { currentPath, dispatch } = this.props;
        const settingsActive = currentPath === PathEnum.intervalInput ||
            currentPath === PathEnum.intervalLaterInput ||
            currentPath === PathEnum.settings;
        return (
            <Footer>
                <FooterTab>
                    <Button vertical active={settingsActive}
                            onPress={() => dispatch(redirectTo(PathEnum.settings, currentPath))} title="设置">
                        <Icon name="md-settings" />
                        <Text>设置</Text>
                    </Button>
                    <Button vertical active={currentPath === PathEnum.dashboard}
                            onPress={() => dispatch(redirectTo(PathEnum.dashboard, currentPath))} title="记录">
                        <Icon active name="md-podium" />
                        <Text>记录</Text>
                    </Button>
                    <Button vertical active={currentPath === PathEnum.home}
                            onPress={() => dispatch(redirectTo(PathEnum.home, currentPath))} title="主页">
                        <Icon name="md-home" />
                        <Text>主页</Text>
                    </Button>
                </FooterTab>
            </Footer>);
    }
}

const mapStateToProps = ({ router: { currentPath } }) => ({
    currentPath,
});

export default connect(mapStateToProps)(LocalFooter);