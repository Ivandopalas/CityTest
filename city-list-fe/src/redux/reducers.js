import {connectRouter} from 'connected-react-router'
import {DOMAIN as CITY_DOMAIN, reducer as cityReducer,} from 'services/city'
import {DOMAIN as USER_DOMAIN, reducer as userReducer,} from 'services/user'

export default history => ({
    [CITY_DOMAIN]: cityReducer,
    [USER_DOMAIN]: userReducer,
    router: connectRouter(history),
})
