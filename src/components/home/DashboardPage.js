import React, { Component } from 'react';
import { connect } from 'react-redux';
import Echarts from "native-echarts";
import { Root } from 'native-base';
import CustomRecordButton from "./CustomRecordButton";
import QuickRecordButton from "./QuickRecordButton";
import CustomRecordPopup from "./CustomRecordPopup";
import { findTodayDrinkData } from "../util/DBService";
import { saveChartsDrinkQuantity } from "../../actions";
import ReactPropTypes from "prop-types";

class Dashboard extends Component {
    static defaultProps = {
        eChartsOptions: {
            title: {
                text: '今日总量: 5000ml'
            },
            legend: {
                data: ['喝水量']
            },
            xAxis: {
                data: [],
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
                data: []
            }]
        },
        refresh: false
    };

    static propTypes = {
        currentPath: ReactPropTypes.string.isRequired,
        eChartsOptions: ReactPropTypes.object,
        refresh: ReactPropTypes.bool,
    };

    componentDidMount() {
        fetchDrinkQuantityData(this.props.dispatch);
    }

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

const fetchDrinkQuantityData = (dispatch) => {
    findTodayDrinkData(drinkQuantity => {
        dispatch(saveChartsDrinkQuantity(drinkQuantity));
    });
};

const mapStateToProps = ({ router: { currentPath }, charts: { drinkQuantity } }) => ({
    currentPath,
    eChartsOptions: {
        title: {
            text: '今日总量: 5000ml'
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
            data: drinkQuantity && drinkQuantity.data ? drinkQuantity.data : []
        }]
    }
});

export default connect(mapStateToProps)(Dashboard);