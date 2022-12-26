import * as deepmerge from 'deepmerge'
import {call} from 'redux-saga/effects'
import * as R from 'ramda'

const getDefaultOptions = () => ({
    credentials: 'include',
    redirect: 'follow',
    headers: {
        Accept: 'application/json',
    },
})

export function* getRequest(
    url,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {
    let res

    try {
        res = yield call(
            fetch,
            url,
            deepmerge.all([getDefaultOptions(), {method: 'GET'}, options]),
        )
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'GET', {parseJSON, ignore401})
}

export function* postRequest(
    url,
    data,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {
    let res

    try {
        res = yield call(
            fetch,
            url,
            deepmerge.all([
                getDefaultOptions(),
                {
                    method: 'POST',
                    ...(!R.isNil(data)
                        ? {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                        : {}),
                },
                options,
            ]),
        )
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'POST', {
        parseJSON,
        ignore401,
    })
}

export function* postFormRequest(
    url,
    data,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {

    const formData = new FormData()

    for (const [k, v] of Object.entries(data)) {
        formData.set(k, v)
    }

    let res

    try {
        res = yield call(fetch, url, {
            body: formData,
            ...deepmerge.all([getDefaultOptions(), {method: 'POST'}, options]),
        })
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'POST', {
        parseJSON,
        ignore401,
    })
}

export function* putRequest(
    url,
    data,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {
    let res

    try {
        res = yield call(
            fetch,
            url,
            deepmerge.all([
                getDefaultOptions(),
                {
                    method: 'PUT',
                    ...(!R.isNil(data)
                        ? {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                        : {}),
                },
                options,
            ]),
        )
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'PUT', {parseJSON, ignore401})
}

export function* patchRequest(
    url,
    data,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {
    let res

    try {
        res = yield call(
            fetch,
            url,
            deepmerge.all([
                getDefaultOptions(),
                {
                    method: 'PATCH',
                    ...(!R.isNil(data)
                        ? {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                        : {}),
                },
                options,
            ]),
        )
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'PATCH', {
        parseJSON,
        ignore401,
    })
}

export function* deleteRequest(
    url,
    data,
    {parseJSON = false, ignore401 = false, ...options} = {},
) {
    let res

    try {
        res = yield call(
            fetch,
            url,
            deepmerge.all([
                getDefaultOptions(),
                {
                    method: 'DELETE',
                    ...(!R.isNil(data)
                        ? {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                        : {}),
                },
                options,
            ]),
        )
    } catch (error) {
        return {
            error,
            type: 'network',
        }
    }

    return yield call(getResultFromResponse, res, 'DELETE', {
        parseJSON,
        ignore401,
    })
}

function* getResultFromResponse(
    res,
    method,
    {parseJSON = false, ignore401 = false} = {},
) {
    if (res.url.endsWith('/login')) {
        window.location.href = res.url
    }
    if (!res.ok) {

        let errorData

        // Try parsing error JSON
        try {
            errorData = yield call([res, 'json'])
        } catch (err) {
            // If not ok response, just return empty `errorData` later
        }

        return {
            error: new Error(`Status: ${res.status} - ${res.statusText}`),
            type: 'status',
            status: res.status,
            statusText: res.statusText,
            errorData
        }
    }

    let json

    if (parseJSON) {
        // Try parsing JSON
        try {
            json = yield call([res, 'json'])
        } catch (err) {
            // If ok response, needs JSON, but returns no data: error out
            throw new Error('Could not parse JSON from response')
        }
    }

    return {
        status: res.status,
        statusText: res.statusText,
        data: json,
    }
}
