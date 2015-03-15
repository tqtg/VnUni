// app/routes.js

// grab the nerd model we just created
var Uni = require('./models/uni');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    
    
    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    app.get('*', function (req, res) {
        res.render('index') // load our public/views/index.html file
        console.log('Request to home page!');
    });

//    app.get('/uni/:id', function (req, res) {
//        res.render('uni'); // load our public/views/uni.html file
//        console.log('Request to university page!');
//    });
//    
//    app.get('/dbpanel', function (req, res) {
//        res.render('db_panel'); // load our public/views/db_panel.html file
//        console.log('Request to database panel!');
//    });
};