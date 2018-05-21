import React from 'react';
import { ActionSheet, Button, Icon, Text } from 'native-base';
import styles from "./Styles";
import { saveCurrentDrinkQuantity } from "../util/DBService";
import { pushOneChartsDrinkQuantity } from "../../actions";

const BUTTONS = ["50 ml", "100 ml", "150 ml", "200 ml", "250 ml", "取消"];
const CANCEL_INDEX = 5;

const options = {
    options: BUTTONS,
    cancelButtonIndex: CANCEL_INDEX,
    title: "选择您这次的喝水量"
};
const onClick = selectOptionIndex => {
    const selectedQuantity = BUTTONS[selectOptionIndex].replace(" ml", "");
    saveCurrentDrinkQuantity(selectedQuantity);
    this.props.dispatch(pushOneChartsDrinkQuantity(this.state.drinkQuantity));
};

const QuickRecordButton = () => (
    <Button iconLeft full large onPress={() => ActionSheet.show(
        options,
        onClick
    )} title="快捷记录喝水量" style={styles.marginTop30}>
        <Icon name='md-water' />
        <Text>快捷记录</Text>
    </Button>
);

export default QuickRecordButton;