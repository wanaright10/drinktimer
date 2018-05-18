import React from 'react';
import ReactPropTypes from 'prop-types';
import { Button, Icon, Input, Item, Text } from 'native-base';
import styles from "./Styles";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";

const CustomRecordPopup = ({ onClickOK, initialize }) => (
    <PopupDialog height={200}
                 dialogStyle={{ position: 'absolute', top: 200 }}
                 dialogTitle={<DialogTitle title="请输入您本次的喝水量" />}
                 ref={initialize}
    >
        <Item>
            <Icon active name='cafe' />
            <Input />
        </Item>
        <Button iconLeft
                full
                onPress={onClickOK}
                title="手动记录喝水量"
                success
                style={styles.marginTop30}
        >
            <Icon name='md-add' />
            <Text>确定</Text>
        </Button>
    </PopupDialog>
);

CustomRecordPopup.propTypes = {
    onClickOK: ReactPropTypes.func.isRequired,
    initialize: ReactPropTypes.func.isRequired,
};

export default CustomRecordPopup;