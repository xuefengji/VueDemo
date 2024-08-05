const env = import.meta.env.MODE || "prod"

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: '/api/home/getTable'
    },
    test: {
        baseApi: '/api',
        mockApi: '/api/home/getTable'
    },
    prod: {
        baseApi: '/api',
        mockApi: '/api/home/getTable'
    }
}

export default {
    env,
    ...EnvConfig[env],
    mock: false
}