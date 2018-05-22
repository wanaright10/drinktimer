import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Button, Icon, Text } from 'native-base';
import styles from "./Styles";
import { saveCurrentDrinkQuantity } from "../util/DBService";
import { pushOneChartsDrinkQuantity } from "../../actions";

class QuickRecordButton extends Component {
    showActionSheet() {
        const { buttons, cancelIndex } = this.props;

        const options = {
            options: buttons,
            cancelButtonIndex: cancelIndex,
            title: "选择您这次的喝水量"
        };
        if (this.actionSheet !== null) {
            this.actionSheet._root.showActionSheet(options, this.onClick);
        }
    }

    onClick = selectOptionIndex => {
        const { buttons, cancelIndex, dispatch } = this.props;
        if (selectOptionIndex !== cancelIndex) {
            const selectedQuantity = buttons[selectOptionIndex].replace(" 毫升", "");
            saveCurrentDrinkQuantity(selectedQuantity);
            dispatch(pushOneChartsDrinkQuantity(selectedQuantity));
        }
    };

    render() {
        return (
            <Button iconLeft full large onPress={() => this.showActionSheet()} title="快捷记录喝水量"
                    style={styles.marginTop30}>
                <Icon name='md-water' />
                <Text>快捷记录</Text>
                <ActionSheet ref={(c) => {
                    this.actionSheet = c;
                }} />
            </Button>
        );
    }
}

const mapStateToProps = ({ settings: { quickDrinkQuantityList } }) => {
    if (!quickDrinkQuantityList) {
        quickDrinkQuantityList = ['50', '100', '150', '200', '250'];
    }

    const buttons = quickDrinkQuantityList.map(quantity => `${quantity} 毫升`);
    buttons.push('取消');
    return {
        buttons,
        cancelIndex: buttons.length - 1
    };
};

export default connect(mapStateToProps)(QuickRecordButton);