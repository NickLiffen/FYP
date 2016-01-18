"use strict";

var databaseQuery = require('../config/database.js');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.render('index.ejs'); // load the index.ejs file
  });

  app.get('/app', allowAdmins, function(req, res) {
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

  app.get('/app/profile', allowAdmins, function(req, res) {
      res.render('profile.ejs', {
          user : req.user,
          message: req.flash('profileMessage')
      });
  });

  app.get('/app/parent', allowAdmins, function(req, res) {
      res.render('parent.ejs', {
          user : req.user,
          message: req.flash('parentMessage')
      });
  });

  app.get('/app/teacher', allowAdmins, function(req, res) {
      res.render('teacher.ejs', {
          user : req.user,
          message: req.flash('teahcerMessage')
      });
  });

  app.get('/app/pupil', allowAdmins, function(req, res) {
      res.render('pupil.ejs', {
          user : req.user,
          message: req.flash('pupilMessage')
      });
  });

  app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/update', allowAdmins, function(req, res) {
      res.render('update.ejs', {
          user : req.user // get the user out of session and pass to template
      });
    });

    app.get('/app/class', allowAdmins, function(req, res) {
      res.render('class.ejs', {
          user : req.user,
          message: req.flash('profileMessage') // get the user out of session and pass to template
      });
    });

    app.post('/update', function(req, res){

      //Declare vars
      let email, username, id;
      //Get the information sent through by the profile page and store it in our variables
      email = req.body.email;
      username = req.body.username;
      id = req.user.id;

      /*
      if(email === req.user.email && username === req.user.username){
        req.flash('profileMessage', 'You have not changed anything');
        res.redirect('app/profile');
      }*/

      //Run the function that goes to config/database.js to update the users settings
      databaseQuery.updateProfile(email, username, id);

      //This is the new information about the user
      let user = {
            id: req.user.id,
            name: req.user.name,
            email: email,
            username: username,
            password: req.user.password,
            privlidge: req.user.privlidge,
            role: req.user.role
          };

      //Have to re-log the user in to update the users information in session.
      req.logIn(user, function () {
        req.session.save(function(){
            res.redirect('/app/profile');
        });
      });

      req.flash('profileMessage', 'You have successfully updated your profile');
      res.redirect('app/profile');
    });
};

//Allow Admin to view only Admin URI's
function allowAdmins(req, res, next) {
  if(!req.user){
    req.flash('loginMessage', "Something went wrong, re-login please");
    res.redirect('/login');
  }
  else if(req.user.role === 'Admin'){
    return next();
  }
  else{
    req.flash('loginMessage', "Naughty, Naughty your not an admin!");
    res.redirect('/login');
  }
}
