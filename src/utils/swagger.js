const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Node.js API with MSSQL for Auth Management',
        version: '1.0.0',
        description: 'API Documentation',
      },
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
    },
    apis: ['D:/Projects/Git/Base application (React js and Node js)/src/Backend/Api (Nodejs)/src/routes/*.js'],
  };
  
module.exports = swaggerOptions;  
