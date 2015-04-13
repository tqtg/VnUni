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
        Uni.find({"id": String(req.params.id)}, function(err, unis){            
            res.send(unis);
        });                        
    })
    app.get('/ds_truong', function(req, res, next){
        Uni.find({},'id name', function(err, unis){
            res.send(unis);
        });        
    })

    app.get('/search', function(req, res, next) {
        console.log("Searching request with parameters:");
        var queryParams = {
            $and: [
                {
                    region: Number(req.query.vungmien),
                    city: Number(req.query.thanhpho),
                    type: Number(req.query.loaitruong)
                },
                {
                    $or: [
                        {
                            majors: {
                                $elemMatch: {
                                    id: String("D" + String(req.query.nganhhoc))
                                }
                            }
                        },
                        {
                            majors: {
                                $elemMatch: {
                                    id: String("C" + String(req.query.nganhhoc))
                                }
                            }
                        }
                    ]
                }
            ]
        }
        console.log(queryParams);

        Uni.getAll(queryParams, function(err, data) {
            console.log(data.length + " Found!");
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

    app.get('/edit_db/:id', function (req, res, next) {        
        next();
    });

    // frontend routes =========================================================
    app.get('/dbpanel', function (req, res, next) {
        next();
    });

    //  View admission marks
    app.get('/diemchuan', function (req, res, next) {
        next();
    })

    //  DON'T DELETE !!!
    //  This code handle all request from client
    app.use('/', function (req, res) {
        console.log('Request to home page!');
        res.render('index');    // load our public/index.html file
    })
};