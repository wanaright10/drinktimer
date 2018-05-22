import React from 'react';
import Route from './Route';
import Dashboard from '../dashboard/DashboardPage';
import Settings from '../settings/SettingsPage';
import { View } from "react-native";
import IntervalInputPage, { IntervalType } from "../settings/IntervalInputPage";

export const PathEnum = {
    dashboard: '/dashboard',
    home: '/home',
    settings: '/settings',
    intervalInput: '/interval',
    intervalLaterInput: '/intervalLater',
};

const Router = () => (
    <View>
        <Route path={PathEnum.dashboard} component={<Dashboard />} />
        <Route path={PathEnum.settings} component={<Settings />} />
        <Route path={PathEnum.intervalInput} component={<IntervalInputPage intervalType={IntervalType.INTERVAL} />} />
        <Route path={PathEnum.intervalLaterInput} component={<IntervalInputPage intervalType={IntervalType.INTERVAL_LATER} />} />
    </View>

);

export default Router;