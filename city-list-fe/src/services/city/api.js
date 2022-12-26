import {call} from 'redux-saga/effects'
import envConfig from '../../config/environment'
import {postRequest, putRequest} from '../http-call'

const CITIES_ENDPOINT = `${envConfig.backendUrl}/city`
const SEARCH_CITIES_ENDPOINT = `${CITIES_ENDPOINT}/search`


export function* loadCities(name, page, size) {
    return yield call(
        postRequest,
        `${SEARCH_CITIES_ENDPOINT}?page=${page}&size=${size}&sort=name`,
        {
            name
        },
        {parseJSON: true},
    )
}

export function* updateCity(id, name, photoUrl) {
    return yield call(
        putRequest,
        CITIES_ENDPOINT,
        {
            id,
            name,
            photoUrl
        },
        {parseJSON: true},
    )
}
