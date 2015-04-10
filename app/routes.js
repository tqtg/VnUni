// app/routes.js
// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://tuantq:quoctuan@ds035557.mongolab.com:35557/vnuni');

// grab the nerd model we just created
var Uni = require('./models/university');
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
        // console.log(req.query);
        var queryParams = {
            // nganhhoc: req.query.nganhhoc,
            // khoithi: req.query.khoithi,
            // mucdiem: req.query.mucdiem,
            region: Number(req.query.vungmien),
            city: Number(req.query.thanhpho),
            type: Number(req.query.loaitruong)
        }
        console.log(queryParams);

        Uni.getAll(queryParams, function(err, data) {
            console.log(data.length);
            res.json(data);
        });
    })

    //  handle query from loadFilterService
    app.get('/filter/:name', function(req, res) {
        switch(req.params.name) {
            case 'nganhhoc':
                Nganhhoc.getAll(function(err, data) { res.json(data) });
                break;
            case 'khoithi':
                Khoithi.getAll(function(err, data) { res.json(data) });
                break;
            case 'mucdiem':
                Mucdiem.getAll(function(err, data) { res.json(data) });
                break;
            case 'vungmien':
                Vungmien.getAll(function(err, data) { res.json(data) });
                break;
            case 'thanhpho':
                Thanhpho.getAll(function(err, data) { res.json(data) });
                break;
            case 'loaitruong':
                Loaitruong.getAll(function(err, data) { res.json(data) });
                break;
            default:
                res.send('Please give the right filter name!');
        };
        
    })

    // frontend routes =========================================================
    app.get('*', function (req, res) {
        console.log('Request to home page!');
        res.render('index'); // load our public/index.html file
    });
};