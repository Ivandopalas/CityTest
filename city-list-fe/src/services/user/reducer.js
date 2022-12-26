import * as actionTypes from './action-types'
import {assocPath} from "ramda";
import {KEY_IS_EDIT_ROLE} from "./constants";

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_IS_EDIT_ROLE:
            return assocPath([KEY_IS_EDIT_ROLE], payload, state)
        default:
            return state
    }
}