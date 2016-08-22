var express = require('express');
var database = require('../resources/database');

var router = express.Router();

module.exports = function( app ) {

    app.get('/', function( req, res, next ) {
        res.render('public/public');    
    });

    app.get('/purchase_request', function(req, res, next) {
      res.render('admin/purchase-request');
    });

    app.get('/equipment', function(req, res, next) {
      res.render('admin/equipment');
    });

    app.get('/login', function(req, res, next) {
      res.render('public/login');
    });

    app.get('/finances', function(req, res, next) {
      res.render('admin/finances');
    });

}
