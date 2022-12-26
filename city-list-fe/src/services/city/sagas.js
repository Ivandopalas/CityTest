import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as actionTypes from './action-types'
import * as api from "./api";
import {setCities} from "./actions";


function* loadCitiesSaga({payload: {name, page, size}}) {
    const response = yield call(api.loadCities, name, page, size)
    if (response.error) {
        return
    }
    yield put(
        setCities(response.data)
    )
}

function* updateCitySaga({payload: {id, name, photoUrl}}) {
    yield call(api.updateCity, id, name, photoUrl)
}

export default function* () {
    yield all([
        takeLatest(actionTypes.UPDATE_CITY, updateCitySaga),
        takeLatest(actionTypes.LOAD_CITIES, loadCitiesSaga)
    ])
}
