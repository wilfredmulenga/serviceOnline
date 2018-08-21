import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

// Firebase.database()
//     .ref(`Users/${userUID}`)
//     .on('value')
//     .then()
const __firebase = 'firebase'

export const Provider = ({ children }) => (
    <UserContext.Provider value={__firebase}>
        {children}
    </UserContext.Provider>
)

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};