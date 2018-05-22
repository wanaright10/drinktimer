import React, { Component } from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import { connect } from "react-redux";
import { redirectTo } from "../../actions";

class LocalHeader extends Component {
    render() {
        const { dispatch, currentPath, previousPath } = this.props;
        return (
            <Header>
                <Left>
                    <Button transparent onPress={() => dispatch(redirectTo(previousPath, currentPath))} title="">
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Title>喝水提醒</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}

const mapStateToProps = ({ router: { currentPath, previousPath } }) => ({
    currentPath,
    previousPath
});

export default connect(mapStateToProps)(LocalHeader);