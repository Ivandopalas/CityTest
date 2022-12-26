import {call} from 'redux-saga/effects'
import envConfig from '../../config/environment'
import {getRequest} from '../http-call'

const USER_ENDPOINT = `${envConfig.backendUrl}/user`


export function* loadIsEditRole() {
    return yield call(
        getRequest,
        `${USER_ENDPOINT}/isEditAllowed`,
        {parseJSON: true},
    )
}
