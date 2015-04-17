// app/routes.js
// connect to database
var mongoose = require('mongoose');
var db = require('../config/db');
mongoose.connect(db.url);

// grab the nerd model we just created
var Uni = require('./models/university');
var Nganhhoc = require('./models/nganhhoc');
var Khoithi = require('./models/khoithi');
var Mucdiem = require('./models/mucdiem');
var Vungmien = require('./models/vungmien');
var Thanhpho = require('./models/thanhpho');
var Loaitruong = require('./models/loaitruong');
var User = require('./models/user');

module.exports = function (app) {
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.get('/uni/:id', function(req, res, next) { 
        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        } else {
            Uni.find({"id": String(req.params.id)}, '-_id', function(err, unis){                        
                res.send(unis);            
            });
        }
    })

    app.get("/school_type", function(req, res, next){
        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        }  else {
            Loaitruong.find({},"id name",function(err, loaitruong){
                res.send(loaitruong);
            });
        }
    });
    app.get("/region", function(req, res, next){
        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        }   else {
            Vungmien.find({},"id name",function(err, region){
                res.send(region);
            });
        }     
    });    
    app.get("/city", function(req, res, next){
        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        } else {
            Thanhpho.find({},"id name",function(err, city){
                res.send(city);
            });            
        }

    });        
    app.get('/list_school', function(req, res, next){
        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        }  else {
            Uni.find({},'id name', function(err, unis){
                res.send(unis);
            });     
        }            
    })
    app.get('/admin', function(req, res, next){

        if (!req.session.username || !req.session.password)  {
            res.redirect('/login');
        } else 
            res.render('index');
        
    });
    app.get('/login', function(req, res, next){
        console.log(req.session.username + " " + req.session.password);        
        if (!req.session.username || !req.session.password)  {
            res.render("index");
        } else {
            res.redirect('/');
        }            
        
    });        
    app.post('/authenticate',function(req, res, next){                                                        
        User.find({'username': req.body.username, 'password': req.body.password},'type school', function(err, users){                        
            console.log(users);            
            if ( !users || users.length == 0 ){                                
                res.send('/login');         
            }                
            else {                
                req.session.username = req.body.username;
                req.session.password = req.body.password;                                
                if (users[0].type == 'admin'){                    
                    res.send('/admin');                    ;
                }                                     
                else {
                    res.send('/school_db/'+users[0].school);                    ;                    
                }                    
            }
        });                 
    })
    app.get("/logout",function(req, res, next){
        req.session.destroy();
        res.redirect('/login');
    });

    //  Search with filter system
    app.get('/search', function(req, res, next) {
        console.log("Searching request from filter system");
        var queryParams = {
            region: Number(req.query.vungmien),
            city: Number(req.query.thanhpho),
            type: Number(req.query.loaitruong),
            majors: {
                $elemMatch: {
                    id: (String(req.query.nganhhoc) == "0") ? 0 : {$in: [
                        String("D" + String(req.query.nganhhoc)),
                        String("C" + String(req.query.nganhhoc))
                    ]},
                    divisions: String(req.query.khoithi),
                    admissionMarks: {
                        $elemMatch: {
                            year: 2014,
                            mark: {
                                $gt: Number(req.query.mucdiemThap),
                                $lt: Number(req.query.mucdiemCao)
                            }
                        }
                    }
                }
            }
        }
        
        Uni.findWithFilter(queryParams, function(err, data) {
            console.log(data.length + " Found!");
            res.json(data);
        });
    })

    //  Search with tags in search bar
    app.get('/searchwithtags', function(req, res) {
        console.log("Searching request with tags from search bar");
        var reqTags = JSON.parse(req.query.tags);
        var regionArr = [];
        var cityArr = [];
        var typeArr = [];
        var majorArr = [];
        var divisionArr = [];
        for (var i = 0; i < reqTags.length; i++) {
            switch(String(reqTags[i].field)) {
                case 'R':
                    regionArr.push(Number(reqTags[i].id));
                    break;
                case 'C':
                    cityArr.push(Number(reqTags[i].id));
                    break;
                case 'T':
                    typeArr.push(Number(reqTags[i].id));
                    break;
                case 'M':
                    majorArr.push(String('D' + reqTags[i].id));
                    majorArr.push(String('C' + reqTags[i].id));
                    break;
                case 'D':
                    divisionArr.push(String(reqTags[i].id));
                    break;
                default:
                    break;
            }
        }

        var params = {
            $or: [
                { region: (regionArr.length != 0) ? {$in: regionArr} : 0 },
                { city: (cityArr.length != 0) ? {$in: cityArr} : 0 }
            ],
            type: (typeArr.length != 0) ? {$in: typeArr} : 0,
            majors: {
                $elemMatch: {
                    id: (majorArr != 0) ? {$in: majorArr} : 0,
                    divisions: (divisionArr.length != 0) ? {$in: divisionArr} : 0
                }
            }
        }
        
        Uni.findWithTags(params, function(err, data) {
            console.log(data.length + " Found!");
            res.json(data);
        });
    })

    app.get('/mark', function (req, res, next) {     
        Uni.getUni({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/mark/:id', function (req, res, next) {     
        var uniId = req.params.id;
        Uni.getMajors({id: uniId}, function(err, data) {
            res.json(data);
        });
    });

    //  handle query from loadFilterService
    app.get('/filter/:name', function (req, res) {
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
        
    //  get data for uni infor page
    app.get('/infor/:id/:need', function(req, res, next) {
        var uniId = String(req.params.id);
        var need = String(req.params.need);
        switch (need) {
        case 'thongtin':
            Uni.find({id: uniId}, 'name -_id', function(err, uni) { res.json(uni); });
            break;
        case 'khoadaotao':
            Uni.find({id: uniId}, 'name -_id', function(err, uni) { res.json(uni); });
            break;
        case 'xemdiemchuan':
            Uni.find({id: uniId}, 'name majors -_id', function(err, uni) { res.json(uni); });
            break;
        case 'tuyensinh':
            Uni.find({id: uniId}, 'name -_id', function(err, uni) { res.json(uni); });
            break;
        case 'lienhe':
            Uni.find({id: uniId}, 'name address phone email website -_id', function(err, uni) { res.json(uni); });
            break;
        default:
            break;
        }
    })

    //  DON'T DELETE !!!
    //  This code handle all request from client
    app.use('/', function (req, res) {        
        res.render('index');    // load our public/index.html file
    })
};