import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

let __firebase = []

export const Provider = ({ children }) => (
    <UserContext.Provider value={__firebase}>
        {children}
    </UserContext.Provider>
)

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};