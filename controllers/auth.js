const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body

    if ((!email || email === '') || (!password || password === '')) {
      return res.redirect('/login')
    }

    if (!req.session.user) {
      const user = await User.findOne({ email })
      req.session.user = user
    }
    req.session.isLoggedIn = true
    res.redirect('/');
  };
