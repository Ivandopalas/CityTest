import {assocPath} from 'ramda'
import * as actionTypes from './action-types'
import {KEY_LOADED_CITIES} from "./constants";

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_CITIES:
            return assocPath([KEY_LOADED_CITIES], payload.cities, state)
        default:
            return state
    }
}
