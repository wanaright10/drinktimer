import React, { Component } from 'react';
import { connect } from 'react-redux';
import Echarts from "native-echarts";
import { Root } from 'native-base';
import CustomRecordButton from "./CustomRecordButton";
import QuickRecordButton from "./QuickRecordButton";
import CustomRecordPopup from "./CustomRecordPopup";
import ReactPropTypes from "prop-types";

class Dashboard extends Component {

    static propTypes = {
        currentPath: ReactPropTypes.string.isRequired,
        eChartsOptions: ReactPropTypes.object.isRequired,
    };

    render() {
        const { eChartsOptions } = this.props;
        return (
            <Root>
                <Echarts option={eChartsOptions} height={400} />
                <CustomRecordButton onClick={() => this.popupDialog.show()} />
                <QuickRecordButton />
                <CustomRecordPopup onClickOK={() => this.popupDialog.dismiss()}
                                   initialize={popupDialog => this.popupDialog = popupDialog} />
            </Root>
        );
    }
}

const mapStateToProps = ({ router: { currentPath }, charts: { drinkQuantity } }) => {
    const chartData = drinkQuantity && drinkQuantity.data ? drinkQuantity.data : [];
    let total = 0;
    if (chartData.length !== 0) {
        total = chartData.map(quantity => Number(quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    return {
        currentPath,
        eChartsOptions: {
            title: {
                text: `今日总量: ${total}ml`
            },
            legend: {
                data: ['喝水量']
            },
            xAxis: {
                data: drinkQuantity && drinkQuantity.time ? drinkQuantity.time : [],
            },
            yAxis: {
                name: '毫升(ml)'
            },
            tooltip: {
                formatter: '{c0} ml'
            },
            series: [{
                name: '喝水量',
                type: 'bar',
                color: ['#aadaf5'],
                data: chartData
            }]
        }
    }
};

export default connect(mapStateToProps)(Dashboard);