import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import createStore from './redux/create-store'
import * as serviceWorker from './serviceWorker'

import AppProvider from './app/AppProvider'
import App from './app/App'

import './assets/stylesheets/style.scss'

const initialState = window.___INITIAL_STATE__
const history = createBrowserHistory()
const store = createStore(initialState, history)

ReactDOM.render(
    <AppProvider store={store} history={history}>
        <App/>
    </AppProvider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
