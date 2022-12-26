import * as actionTypes from './action-types'

export const loadCities = (name, page, size) => ({
    type: actionTypes.LOAD_CITIES,
    payload: {name, page, size},
})

export const setCities = cities => ({
    type: actionTypes.SET_CITIES,
    payload: {cities},
})

export const updateCity = (id, name, photoUrl) => ({
    type: actionTypes.UPDATE_CITY,
    payload: {id, name, photoUrl},
})