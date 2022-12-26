import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import sagas from './sagas'
import rootReducer from './root-reducer'

const MAX_INSPECTOR_ACTIONS = 100

export default (initialState = {}, history = {}, onSagasError = {}) => {
    // redux extension

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                maxAge: MAX_INSPECTOR_ACTIONS,
            })
            : compose

    // midleware

    const middleware = [routerMiddleware(history), sagas.middleware]

    // create store

    const store = createStore(
        rootReducer(initialState, history),
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    )

    store.asyncReducers = {}

    // sagas

    sagas.start(onSagasError)

    return store
}
