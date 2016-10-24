const express = require('express');

module.exports = ({ ensureLoggedIn }) => {
  /* eslint new-cap: "off" */
  const router = express.Router();

  router.get('/profile',
    ensureLoggedIn,
    (req, res) => {
      res.render('profile.ejs', { user: req.user });
    }
  );

  return router;
};
