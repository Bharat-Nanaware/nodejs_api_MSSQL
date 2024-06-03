const { expressjwt } = require('express-jwt');
//const config = require('config.json');
const jwtConfig = require('../config/jwtConfig');
module.exports = jwt;

function jwt() {
    const { secret } = jwtConfig;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/login',
            '/password/forgot-password',
            '/password/ChangePassword'
        ]
    });
}
