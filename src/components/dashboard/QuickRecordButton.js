import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Button, Icon, Text } from 'native-base';
import styles from "./Styles";
import { saveCurrentDrinkQuantity } from "../util/DBService";
import { pushOneChartsDrinkQuantity } from "../../actions";

class QuickRecordButton extends Component {
    onClick = selectOptionIndex => {
        const { buttons, cancelIndex } = this.props;
        if (selectOptionIndex !== cancelIndex) {
            const selectedQuantity = buttons[selectOptionIndex].replace(" 毫升", "");
            saveCurrentDrinkQuantity(selectedQuantity);
            this.props.dispatch(pushOneChartsDrinkQuantity(selectedQuantity));
        }
    };

    render() {
        const { buttons, cancelIndex } = this.props;
        const options = {
            options: buttons,
            cancelButtonIndex: cancelIndex,
            title: "选择您这次的喝水量"
        };
        return (
            <Button iconLeft full large onPress={() => ActionSheet.show(
                options,
                this.onClick
            )} title="快捷记录喝水量" style={styles.marginTop30}>
                <Icon name='md-water' />
                <Text>快捷记录</Text>
            </Button>
        );
    }
}

const mapStateToProps = ({ settings: { quickDrinkQuantityList } }) => {
    if (!quickDrinkQuantityList) {
        quickDrinkQuantityList = ['50', '100', '150', '200', '250'];
    }
    return {
        buttons: quickDrinkQuantityList.map(quantity => `${quantity} 毫升`),
        cancelIndex: quickDrinkQuantityList.length === 0 ? 0 : quickDrinkQuantityList.length === 0 - 1
    };
};

export default connect(mapStateToProps)(QuickRecordButton);