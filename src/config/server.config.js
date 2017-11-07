const SERVER_ENV = {
    'production': { 
        api_gql: {
            url: process.env.GQL_SERVER_URL,
            port: process.env.GQL_SERVER_PORT
        },
        api_rest: {
            url: process.env.REST_SERVER_URL,
            port: process.env.REST_SERVER_PORT
        }
    },
    'development': { 
        api_gql: {
            url: 'http://localhost',
            port: 4000
        },
        api_rest: {
            url: 'http://localhost',
            port: 3000
        }
    },
    'test': { 
        api_gql: {
            url: 'http://localhost',
            port: 4500
        },
        api_rest: {
            url: 'http://localhost',
            port: 3000
        }
    }
};

export default SERVER_ENV;