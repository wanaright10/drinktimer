import React from 'react';
import ReactPropTypes from 'prop-types';
import { Button, Icon, Text } from 'native-base';
import styles from "./Styles";

const CustomRecordButton = ({ onClick }) => (
    <Button iconLeft full large onPress={onClick} title="手动记录喝水量" success
            style={styles.marginTop30}>
        <Icon name='md-create' />
        <Text>手动记录</Text>
    </Button>
);

CustomRecordButton.propTypes = {
    onClick: ReactPropTypes.func.isRequired,
};

export default CustomRecordButton;