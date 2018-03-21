const logRoutes = require('../log/');
//const adminRoutes = require('./admin_routes');

module.exports = function (app) {
    logRoutes(app);
    //adminRoutes(app, db);
    // Other route groups could go here, in the future
};