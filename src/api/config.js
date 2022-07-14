const Joi = require('joi');

module.exports = {
  host: process.env.HOST || '',
  server: process.env.SERVER || '',
  redis: {
    connectionString: 'redis://localhost'
  },
  thirdparty: {
    onesimpleapi: {
      key: process.env.ONESIMPLEAPI_KEY
    }
  },
  expandUrl: {
    schema: Joi.object({
      shortUrl: Joi.string().uri().required(),
    })
  },
  serviceInfo: {
    microservice: process.env.NAME || 'Short URL Expander Service',
    routes: [{
      path: '/api/v1/health',
      methods: ['GET'],
      description: 'Returns the health status of the service'
    }, {
      path: '/api/v1/info',
      methods: ['GET'],
      description: 'Returns useful information about the service'
    }, {
      path: '/api/v1/expand-url',
      methods: ['POST'],
      description: '',
      schema: {
        POST: {
          shortUrl: 'Required, String'
        }
      }
    }],
    description: process.env.DESCRIPTION || '',
  }
}