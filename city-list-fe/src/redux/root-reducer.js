import {combineReducers} from 'redux'
import reducers from './reducers'

const rootReducer = (initialState = {}, history = {}) => {
    const appReducer = combineReducers(reducers(history))

    return (state, action) => appReducer(state, action)
}

export default rootReducer
