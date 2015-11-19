"use strict";

var databaseQuery = require('../config/database.js');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.render('index.ejs'); // load the index.ejs file
  });

  app.get('/app', isLoggedIn, function(req, res) {
      res.render('app.ejs', { message: req.flash('appMessage') });
  });

  app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/app', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash    :  true // allow flash messages
  }));

  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/app', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  app.get('/app/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user,
          message: req.flash('profileMessage')
      });
  });

  app.get('/app/parent', isLoggedIn, function(req, res) {
      res.render('parent.ejs', {
          user : req.user,
          message: req.flash('parentMessage')
      });
  });

  app.get('/app/teacher', isLoggedIn, function(req, res) {
      res.render('teacher.ejs', {
          user : req.user,
          message: req.flash('teahcerMessage')
      });
  });

  app.get('/app/pupil', isLoggedIn, function(req, res) {
      res.render('pupil.ejs', {
          user : req.user,
          message: req.flash('pupilMessage')
      });
  });

  app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/update', isLoggedIn, function(req, res) {
      res.render('update.ejs', {
          user : req.user // get the user out of session and pass to template
      });
    });

    app.get('/app/class', isLoggedIn, function(req, res) {
      res.render('class.ejs', {
          user : req.user,
          message: req.flash('profileMessage') // get the user out of session and pass to template
      });
    });

    app.post('/update', function(req, res){

      var email, number;

      email = req.body.email;
      number = req.body.number;

      databaseQuery.updatProfile(email, number);

      req.flash('profileMessage', 'You have successfully updated your profile');
      res.redirect('app/profile');

    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
      }

    req.flash('loginMessage', "You aren't logged in, please log in");
    res.redirect('/login');
}
