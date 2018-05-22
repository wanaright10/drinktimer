import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Body, Button, Form, Icon, Input, Item, Label, ListItem, Right, Separator, Text, View } from 'native-base';
import ReactPropTypes from "prop-types";
import styles from "../dashboard/Styles";
import { pushQuickDrinkQuantityList, removeQuickDrinkQuantityList } from "../../actions";
import { saveQuickDrinkQuantityList } from "../util/DBService";

class QuickDrinkQuantityList extends Component {

    static defaultProps = {
        quickDrinkQuantityList: ['50', '100', '150', '200', '250'],
    };

    static propTypes = {
        quickDrinkQuantityList: ReactPropTypes.array,
    };

    constructor() {
        super();
        this.state = {
            invalidInput: false,
            addQuantity: '0',
        }
    }

    removeOneItem = (quickDrinkQuantityList, quantity, dispatch) => {
        dispatch(removeQuickDrinkQuantityList(quantity));
        saveQuickDrinkQuantityList(quickDrinkQuantityList.filter(item => item !== quantity));
    };

    changeInput = value => {
        if (value === '' || value === '0' || /^\d+$/.test(value)) {
            this.setState({ addQuantity: value });
            this.setState({ invalidInput: false });
        } else {
            this.setState({ invalidInput: true });
        }
    };

    addQuantity = (quickDrinkQuantityList, dispatch) => {
        const { addQuantity } = this.state;
        if (addQuantity !== '' && addQuantity !== '0' && /^\d+$/.test(addQuantity)) {
            const { addQuantity } = this.state;
            dispatch(pushQuickDrinkQuantityList(addQuantity));

            quickDrinkQuantityList.push(addQuantity);
            saveQuickDrinkQuantityList(quickDrinkQuantityList);
            this.setState({ addQuantity });
            Alert.alert("新增成功");
        }
    };

    render() {
        const { quickDrinkQuantityList, dispatch } = this.props;
        quickDrinkQuantityList.sort((a, b) => a - b);
        return (
            <View>
                <Separator bordered>
                    <Text>水量设置(请勿重复添加)</Text>
                </Separator>

                {quickDrinkQuantityList.map((quantity, quantityIndex) =>
                    <ListItem icon key={`${quantity}${quantityIndex}`}>
                        <Body>
                        <Text>{quantity} 毫升</Text>
                        </Body>
                        <Right>
                            <Button small onPress={() => this.removeOneItem(quickDrinkQuantityList, quantity, dispatch)}
                                    title="删除"
                                    danger>
                                <Icon name='trash' />
                            </Button>
                        </Right>
                    </ListItem>)}

                <Form>
                    <Item error={this.state.invalidInput}>
                        <Label>新增水量(毫升)</Label>
                        <Input onChangeText={(value) => this.changeInput(value)}
                               value={this.state.addQuantity} />
                    </Item>
                    <Button iconLeft full onPress={() => this.addQuantity(quickDrinkQuantityList.slice(), dispatch)}
                            title="添加快捷喝水量" success
                            style={styles.marginTop30}>
                        <Icon name='md-add' />
                        <Text>新增水量</Text>
                    </Button>
                </Form>
            </View>
        );
    }
}

const mapStateToProps = ({ settings: { quickDrinkQuantityList } }) => ({
    quickDrinkQuantityList,
});

export default connect(mapStateToProps)(QuickDrinkQuantityList);