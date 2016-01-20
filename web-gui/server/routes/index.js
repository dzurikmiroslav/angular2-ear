var connectRoute = require('connect-route');

module.exports = connectRoute(function(router) {
  router.get('/stuff', function(req, res) {
    res.end('The some mock stuff is here...');
  });
});
