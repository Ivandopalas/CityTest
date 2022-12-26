import createSagaMiddleware from 'redux-saga'
import {all, call} from 'redux-saga/effects'
import citySagas from 'services/city/sagas'
import userSagas from 'services/user/sagas'

const sagasMiddleware = createSagaMiddleware()

function* allSagas(history, onError) {
    try {
        yield all([citySagas(), userSagas()])
    } catch (e) {
        console.error(e)
        if (onError) onError(e)
    }
}

function* rootSaga(history, onError) {
    while (true) {
        try {
            yield call(allSagas, history, onError)
        } catch (e) {
            console.error(e)
            onError(e)
            break
        }
    }
}

export default {
    middleware: sagasMiddleware,
    start: (history, onError) => sagasMiddleware.run(rootSaga, history, onError),
}
