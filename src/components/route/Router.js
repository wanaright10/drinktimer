import React from 'react';
import Route from './Route';
import Dashboard from '../home/DashboardPage';

export const PathEnum = {
    dashboard: '/dashboard',
    home: '/home',
    settings: '/settings',
};

const Router = () => (<Route path={PathEnum.dashboard} component={<Dashboard />} />);

export default Router;