require('dotenv').config();
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const btoa = require('btoa');
const { Users } = require('./db');

const app = express();

const STATIC_DIR = path.resolve(__dirname, '../public');

// Config
app.use(
  session({ secret: 'bellatheball', resave: false, saveUninitialized: true })
);
app.use(parser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(parser.json());

// Configure Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'incorrect username' });
      return user.comparePassword(password, (e, isMatch) => {
        if (e) return done(e);
        if (!isMatch) {
          return done(null, false, { message: 'incorrect password' });
        }
        return done(null, user);
      });
    });
  })
);

const validateAuth = (req, res, next) => {
  // api routes - check basic auth
  if (req.url.match(/add-user/)) {
    const { AUTH_STRING } = process.env;
    const { authorization: authString } = req.headers;

    if (authString === `Basic ${btoa(AUTH_STRING)}`) {
      return next();
    }
    return res.status(401).send('Unauthorized');
  }

  // validate sessions
  if (req.user) {
    if (req.url.match(/\/login/)) {
      return res.redirect('/');
    }

    return next();
  }

  // allow non-session traffic to access login
  if (req.url.match(/\/login/)) {
    return next();
  }

  // otherwise redirect user to login page
  return res.redirect('/login');
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Users.findOne({ _id: id }, (err, user) => done(err, user));
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

app.get('/login', validateAuth, (req, res) => {
  const loginHtmlPath = path.resolve(__dirname, '../public/login.html');
  return res.sendFile(loginHtmlPath);
});

app.post('/add-user', parser.json(), validateAuth, (req, res) => {
  const { username, password } = req.body;
  const newUser = new Users({ username, password });

  newUser.save();

  res.send('success');
});

app.use(validateAuth, express.static(STATIC_DIR));
// configure front end routes
app.use(validateAuth, (req, res, next) => {
  if (req.url.match(/[(water)(lights)/]/)) {
    return res.sendFile(`${STATIC_DIR}/index.html`);
  }
  return next(null);
});

// Routes
app.use(require('./routes'));

// app.use('/*', (req, res) => res.redirect('/'));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };
