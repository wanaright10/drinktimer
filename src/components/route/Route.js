import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPropTypes from 'prop-types';

class Route extends Component {
    static defaultProps = {
        currentPath: '/dashboard',
    };

    static propTypes = {
        currentPath: ReactPropTypes.string,
        path: ReactPropTypes.string.isRequired,
        component: ReactPropTypes.element.isRequired,
    };

    render() {
        const { currentPath, path, component } = this.props;
        return currentPath === path && component;
    }
}

const mapStateToProps = ({ router: { currentPath } }) => ({
    currentPath,
});

export default connect(mapStateToProps)(Route);