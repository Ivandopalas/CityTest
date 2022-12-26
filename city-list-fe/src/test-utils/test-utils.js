import React from 'react'
import {render} from '@testing-library/react'
import {createBrowserHistory} from 'history'
import createStore from 'redux/create-store'
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl'
import translations from '../config/i18n/translations'

const DEFAULT_LOCALE = 'en'

export default function renderWithRedux(ui, reduxState) {
    const history = createBrowserHistory()
    history.push('/')
    const store = createStore(reduxState, history)

    return render(
        <Provider store={store}>
            <IntlProvider
                messages={translations[DEFAULT_LOCALE]}
                locale={DEFAULT_LOCALE}
                textComponent={React.Fragment}
            >
                {ui}
            </IntlProvider>
        </Provider>,
    )
}
