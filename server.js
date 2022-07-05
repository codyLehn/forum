const express = require('express');
const { User } = require('./persist/model');
const app = express();

//allow serving of UI code
app.use(express.static(`${__dirname}/public/`));

app.post('/users', async (req, res) => {
  try {
    User.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: `post request failed to create user`,
      error: err,
    });
  }
});

module.exports = app;
