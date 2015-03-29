// app/routes.js
// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/VnUni');

// grab the nerd model we just created
var Uni = require('./models/uni');
var Nganhhoc = require('./models/nganhhoc');
var Khoithi = require('./models/khoithi');
var Mucdiem = require('./models/mucdiem');
var Vungmien = require('./models/vungmien');
var Thanhpho = require('./models/thanhpho');
var Loaitruong = require('./models/loaitruong');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.get('/uni/:id', function(req, res, next) {
        console.log('Request to university page!');
        next();
        // do something with database and response json
    })

    app.get('/search', function(req, res, next) {
        console.log("Searching request with parameters:");
        console.log(req.query.nganhhoc);
        console.log(req.query.khoithi);
        console.log(req.query.mucdiem);
        console.log(req.query.vungmien);
        console.log(req.query.thanhpho);
        console.log(req.query.loaitruong);
        next();
    })

    //  handle query from loadFilterService
    app.get('/filter/nganhhoc', function(req, res) {
        Nganhhoc.getAll(function(err, data) { res.send(data) });
    })
    app.get('/filter/khoithi', function(req, res) {
        Khoithi.getAll(function(err, data) { res.send(data) });
    })
    app.get('/filter/mucdiem', function(req, res) {
        Mucdiem.getAll(function(err, data) { res.send(data) });
    })
    app.get('/filter/vungmien', function(req, res) {
        Vungmien.getAll(function(err, data) { res.send(data) });
    })
    app.get('/filter/thanhpho', function(req, res) {
        Thanhpho.getAll(function(err, data) { res.send(data) });
    })
    app.get('/filter/loaitruong', function(req, res) {
        Loaitruong.getAll(function(err, data) { res.send(data) });
    })

    // frontend routes =========================================================
    app.get('*', function (req, res) {
        console.log('Request to home page!');
        res.render('index'); // load our public/index.html file
    });
};