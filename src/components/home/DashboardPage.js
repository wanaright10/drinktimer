import React, { Component } from 'react';
import { connect } from 'react-redux';
import Echarts from "native-echarts";
import { Root } from 'native-base';
import CustomRecordButton from "./CustomRecordButton";
import QuickRecordButton from "./QuickRecordButton";
import CustomRecordPopup from "./CustomRecordPopup";

class Dashboard extends Component {

    render() {
        const option = {
            title: {
                text: '今日总量: 5000ml'
            },
            legend: {
                data: ['喝水量']
            },
            xAxis: {
                data: ["9:00", "10:00", "11:00", "13:00", "16:00", "18:00", "9:00", "10:00", "11:00", "13:00", "16:00", "18:00"],
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
                data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
            }]
        };
        return (
            <Root>
                <Echarts option={option} height={400} />
                <CustomRecordButton onClick={() => this.popupDialog.show()} />
                <QuickRecordButton />
                <CustomRecordPopup onClickOK={() => this.popupDialog.dismiss()}
                                   initialize={popupDialog => this.popupDialog = popupDialog} />
            </Root>
        );
    }
}

const mapStateToProps = ({ router: { currentPath } }) => ({
    currentPath,
});

export default connect(mapStateToProps)(Dashboard);