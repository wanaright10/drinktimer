import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Input, Item, Text } from 'native-base';
import styles from "./Styles";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import { saveCurrentDrinkQuantity } from "../util/DBService";
import { pushOneChartsDrinkQuantity } from "../../actions";

class CustomRecordPopup extends Component {
    constructor() {
        super();
        this.state = {
            drinkQuantity: '',
            invalidInput: false
        }
    }

    static propTypes = {
        onClickOK: ReactPropTypes.func.isRequired,
        initialize: ReactPropTypes.func.isRequired,
    };

    changeInput = (value) => {
        if (value === '' || /^\d+$/.test(value)) {
            this.setState({ drinkQuantity: value });
            this.setState({ invalidInput: false });
        } else {
            this.setState({ invalidInput: true });
        }
    };

    onClickButton = callback => () => {
        if (/^\d+$/.test(this.state.drinkQuantity)) {
            saveCurrentDrinkQuantity(this.state.drinkQuantity);
            this.props.dispatch(pushOneChartsDrinkQuantity(this.state.drinkQuantity));
            callback();
        } else if (this.state.drinkQuantity === '') {
            callback();
        }
    };

    render() {
        const { onClickOK, initialize } = this.props;
        return (
            <PopupDialog height={200}
                         dialogStyle={{ position: 'absolute', top: 200 }}
                         dialogTitle={<DialogTitle title="请输入您本次的喝水量(ml)" />}
                         ref={initialize}
            >
                <Item error={this.state.invalidInput}>
                    <Icon active name='cafe' />
                    <Input onChangeText={(value) => this.changeInput(value)}
                           value={this.state.drinkQuantity} />
                </Item>
                <Button iconLeft
                        full
                        onPress={this.onClickButton(onClickOK)}
                        title="手动记录喝水量"
                        success
                        style={styles.marginTop30}
                >
                    <Icon name='md-add' />
                    <Text>确定</Text>
                </Button>
            </PopupDialog>);
    }
}

export default connect()(CustomRecordPopup);