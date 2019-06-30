const privateRoutes = require('../routes/private');
const publicRoutes = require('../routes/public');

module.exports = (app, passport) => {
  app.use('/public', publicRoutes);
  app.use('/private', passport.authenticate('jwt', { session: false }), privateRoutes);
};
