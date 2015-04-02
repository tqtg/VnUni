// app/routes.js
// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://tuantq:quoctuan@ds035557.mongolab.com:35557/vnuni');

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
        // console.log(req.query);
        for (var property in req.query) {
            if (req.query[property] != 0) {
                console.log(property);
            }
        }
        // console.log(req.query.nganhhoc);
        // console.log(req.query.khoithi);
        // console.log(req.query.mucdiem);
        // console.log(req.query.vungmien);
        // console.log(req.query.thanhpho);
        // console.log(req.query.loaitruong);
        next();
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