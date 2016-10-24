const express = require('express');
const passport = require('passport');

module.exports = ({ ensureLoggedOut, User }) => {
  passport.deserializeUser(
    async (id, cb) => {
      try {
        return cb(null, await User.deserialize(id));
      } catch (e) {
        return cb(e);
      }
    }
  );

  passport.serializeUser(
    async (user, cb) => {
      try {
        return cb(null, await user.serialize());
      } catch (e) {
        return cb(e);
      }
    }
  );

  passport.use(new (require('passport-local').Strategy)(
    async (username, password, cb) => {
      try {
        const user = await User.login(username, password);
        return cb(null, user);
      } catch (e) {
        return cb(e);
      }
    })
  );

  /* eslint new-cap: "off" */
  const router = express.Router();

  router.use(require('body-parser').urlencoded({ extended: true }));
  router.use(require('cookie-parser')());
  router.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'secret' }));
  router.use(passport.initialize());
  router.use(passport.session());

  router.route('/login')
    .get(
      ensureLoggedOut,
      (req, res) => {
        res.render('login.ejs');
      })
    .post(
      passport.authenticate('local', { failureRedirect: '/login', successReturnToOrRedirect: '/' })
    );

  router.get('/logout',
    (req, res) => {
      if (req.user) {
        req.logout();
      }
      res.redirect('/');
    }
  );

  return router;
};
