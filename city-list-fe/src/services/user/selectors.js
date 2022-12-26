import {path} from 'ramda'

import {DOMAIN, KEY_IS_EDIT_ROLE} from './constants'


export const getIsEditRole = state => path([DOMAIN, KEY_IS_EDIT_ROLE], state)
