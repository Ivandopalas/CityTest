import * as actionTypes from './action-types'

export const loadIsEditRole = () => ({
    type: actionTypes.LOAD_IS_EDIT_ROLE,
})

export const setIsEditRole = (response) => ({
    type: actionTypes.SET_IS_EDIT_ROLE,
    payload: response
})
