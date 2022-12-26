import React from 'react'
import PropTypes from 'prop-types'
import {Provider as ReduxProvider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'

const AppProvider = ({store, history, children}) => (
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            {children}
        </ConnectedRouter>
    </ReduxProvider>
)

AppProvider.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
}

export default AppProvider
