// app/routes.js

// grab the nerd model we just created
var Uni = require('./models/uni');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.get('/uni/:id', function(req, res, next) {
        console.log('Request to university page!');
        next();
        // do something with database and response json
    })


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('*', function (req, res) {
        console.log('Request to home page!');
        res.render('index'); // load our public/index.html file
    });
};