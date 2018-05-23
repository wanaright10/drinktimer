import React from 'react';
import ReactPropTypes from 'prop-types';
import LocalHeader from "./LocalHeader";
import LocalFooter from "./LocalFooter";
import { Container, Content } from "native-base";

const LocalContainer = ({ children }) => (
    <Container>
        <LocalHeader />
        <Content keyboardShouldPersistTaps={'never'} disableKBDismissScroll>
            {children}
        </Content>
        <LocalFooter />
    </Container>

);

LocalContainer.propTypes = {
    children: ReactPropTypes.element.isRequired,
};

export default LocalContainer;