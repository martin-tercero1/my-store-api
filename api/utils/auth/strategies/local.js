const { Strategy } = require('passport-local');
const AuthServices = require('./../../../services/authService')
const service = new AuthServices();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
async (email, password, done) => {
  try {
    const user = service.getUser(email, password);
    done(null, user);
  } catch(error) {
    done(error, false)
  }
});

module.exports = LocalStrategy;
