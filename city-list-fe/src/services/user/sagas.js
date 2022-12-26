import * as actionTypes from './action-types'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {setIsEditRole} from './actions'
import * as api from './api'

function* loadIsEditRoleSaga() {
    const response = yield call(api.loadIsEditRole)

    if (response.error) {
        return
    }
    yield put(
        setIsEditRole(response.data.value)
    )
}

export default function* () {
    yield all([
        takeLatest(actionTypes.LOAD_IS_EDIT_ROLE, loadIsEditRoleSaga)
    ])
}