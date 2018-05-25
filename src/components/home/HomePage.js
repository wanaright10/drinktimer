import React, { Component } from 'react';
import { connect } from 'react-redux';
import Echarts from "native-echarts";
import { Body, Card, CardItem, Icon, Left, Text, Thumbnail, View } from 'native-base';
import ReactPropTypes from "prop-types";
import { Image } from "react-native";

class Home extends Component {

    static propTypes = {
        currentPath: ReactPropTypes.string.isRequired,
        totalQuantity: ReactPropTypes.number.isRequired,
        eChartsOptions: ReactPropTypes.object.isRequired,
    };

    render() {
        const { eChartsOptions, totalQuantity } = this.props;
        return (
            <View>
                <Echarts option={eChartsOptions} height={400} />
                <Card>

                    <CardItem header>
                        <Text>
                            您今年已经喝了总共 {totalQuantity} 升(L) 水了
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Thumbnail large source={require('../../../assets/drink.png')}
                                   style={{ height: 300, width: '100%' }} />
                    </CardItem>
                    <CardItem footer>
                        <Text>
                            大约相当于{Number(totalQuantity / 19).toFixed(2)}桶水, 跑了{Number(totalQuantity * 20).toFixed(2)} km 路程
                        </Text>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = ({ router: { currentPath }, charts: { monthDrinkQuantity } }) => {
    const chartData = monthDrinkQuantity && monthDrinkQuantity.quantity ? monthDrinkQuantity.quantity : [];
    let total = 0;
    if (chartData.length !== 0) {
        total = chartData.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    return {
        totalQuantity: total,
        currentPath,
        eChartsOptions: {
            title: {
                text: '月统计走势'
            },
            legend: {
                data: ['喝水量']
            },
            xAxis: {
                data: monthDrinkQuantity && monthDrinkQuantity.months ? monthDrinkQuantity.months : [],
                name: '月'
            },
            yAxis: {
                name: '升(L)'
            },
            tooltip: {
                formatter: '{c0} L'
            },
            series: [{
                name: '喝水量',
                type: 'line',
                smooth: true,
                color: ['#aadaf5'],
                data: chartData
            }]
        }
    }
};

export default connect(mapStateToProps)(Home);