const express = require('express');

module.exports = () => {
  /* eslint new-cap: "off" */
  const router = express.Router();

  router.get('/',
    (req, res) => {
      res.render('home.ejs', { user: req.user });
    }
  );

  return router;
};
