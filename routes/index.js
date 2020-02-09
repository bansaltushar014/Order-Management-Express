var express = require('express');
var router = express.Router();
var passport = require('passport');
var Models = require("../db/connection");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/signup', function(req,res,next){
//   res.send("getting data");
// });

router.post('/signup',
  passport.authenticate('local.signup', { failureRedirect: '/users', failureFlash: true }),
  function (req, res) {
    //res.redirect('/');
    console.log("confirmed");
    res.send("success");
  });

router.post('/signin',
  passport.authenticate('local.signin', { failureRedirect: '/users', failureFlash: true }),
  function (req, res) {
    //res.redirect('/');
    console.log("confirmed");
    res.redirect('/order');
  });


// router.post('/signin',
//   passport.authenticate('local.remember', { failureRedirect: '/users', failureFlash: true }),
//   function(req, res, next) {
//     // issue a remember me cookie if the option was checked
//     if (!req.body.remember_me) { return next(); }

//     var token = utils.generateToken(64);
//     Token.save(token, { userId: req.user.id }, function(err) {
//       if (err) { return done(err); }
//       res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
//       return next();
//     });
//   },
//   function (req, res) {
//     //res.redirect('/');
//     console.log("confirmed");
//     res.redirect('/order');
//   });

router.get('/loggedin', isLoggedIn, function (req, res, next) {
  res.send("loggedin");
})

router.get('/order', isLoggedIn, function (req, res, next) {
  // console.log(Models.order.find());

  Models.order.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });

  res.render('order');
});

router.post('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
});


router.post('/postOrder', isLoggedIn, function (req, res, next) {

  var newuser = new Models.order();

  //console.log(req.body);
  Models.order.count({}, function (err, count) {
    console.log("Number of docs: ", count);
    
    newuser.orderNumber = count + 1;
    newuser.orderDueDate = req.body.orderDueDate;
    newuser.customerBuyerName = req.body.customerBuyerName;
    newuser.customerAddress = req.body.customerAddress;
    newuser.customerPhone = req.body.customerPhone;
    newuser.orderTotal = req.body.orderTotal;

    console.log(newuser);
    newuser.save(function (err, result) {
      if (err) {
        return err;
      }
      console.log("data saved!");
    });
  });


  res.redirect('/order');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //res.send("isnotloggedin");
    res.render('index');
  }
}

module.exports = router;
