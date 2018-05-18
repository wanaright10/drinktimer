import React from 'react';
import { Left, Header, Button, Icon, Body, Title, Right } from 'native-base';

const onBackClick = () => {

};

const onMenuClick = () => {
};

const LocalHeader = () => (
    <Header>
        <Left>
            <Button transparent onPress={onBackClick} title="">
                <Icon name='arrow-back' />
            </Button>
        </Left>
        <Body>
        <Title>喝水提醒</Title>
        </Body>
        <Right>
            <Button transparent onPress={onMenuClick} title="">
                <Icon name='menu' />
            </Button>
        </Right>
    </Header>
);

export default LocalHeader;