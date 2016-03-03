var connectRoute = require('connect-route');

var auth = require('./auth');

module.exports = connectRoute(function(router) {
  router.get('/stuff', function(req, res) {
    res.end('The some mock stuff is here...');
  });

  router.post('/auth/user', auth.user);
  router.post('/auth/login', auth.login);
  router.post('/auth/logout', auth.logout);
});
