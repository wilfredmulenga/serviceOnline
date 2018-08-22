import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../config/firebase'

export const UserContext = React.createContext();
const peopleArray = []
let JobsSnapshot
function handleLoad() {
    console.log("handle load ")
    Firebase.database()
        .ref('Users/')
        .orderByChild('profession')
        .on('value', (snapshot) => {
            JobsSnapshot = snapshot.val();

            let elements;
            if (JobsSnapshot == null) {
                console.log("jobs is null")
            } else {
                // React doesnt accept objects in states so it has to be converted into an array
                for (const index in JobsSnapshot) {
                    elements = JobsSnapshot[index];
                    peopleArray.push(elements);
                }
            }
            console.log("uer context", peopleArray)
        });
}
handleLoad()
const __firebase = 'firebase'

export const Provider = ({ children }) => (
    <UserContext.Provider value={__firebase}>
        {children}
    </UserContext.Provider>
)

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};