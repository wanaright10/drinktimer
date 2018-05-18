import React, { Component } from 'react';
import { connect } from 'react-redux';
import Echarts from "native-echarts";
import { Button, Icon, Text } from 'native-base';
import { View } from "react-native";

class Dashboard extends Component {

    render() {
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        return (
            <View>
                <Echarts option={option} height={300} />
                <Button iconLeft full onPress={() => {
                }} title="手动记录喝水量" success>
                    <Icon name='md-create' />
                    <Text>手动记录</Text>
                </Button>
                <Button iconLeft full onPress={() => {
                }} title="快捷记录喝水量">
                    <Icon name='md-water' />
                    <Text>快捷记录</Text>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = ({ router: { currentPath } }) => ({
    currentPath,
});

export default connect(mapStateToProps)(Dashboard);