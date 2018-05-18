import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router, { PathEnum } from "./components/route/Router";
import { redirectTo } from "./actions";
import LocalContainer from "./components/common/LocalContainer";

const store = createStore(allReducers);
store.dispatch(redirectTo(PathEnum.dashboard));
export default class Application extends Component {
    render() {
        return (
            <Provider store={store}>
                <LocalContainer>
                    <Router />
                </LocalContainer>
            </Provider>
        )
    }
}