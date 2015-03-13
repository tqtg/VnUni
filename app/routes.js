// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/uni');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    
    
    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('/', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/views/index.html file
    });

    app.get('/uni/:id', function (req, res) {
        res.sendfile('./public/views/uni.html'); // load our public/views/index.html file
    });
};