exports.user = function(req, res) {
  if (req.session.user) {
    res.end(JSON.stringify(req.session.user));
  } else {
    res.statusCode = 204;
    res.end();
  }
};

exports.login = function(req, res, next) {
  if (req.body.username && req.body.password) {
    req.session.user = {
      username: req.body.username,
      roles: ['USER', 'ADMIN']
    }

    res.end(JSON.stringify(req.session.user));
  } else {
    next('INVALID_LOGIN');
  }
}

exports.logout = function(req, res, next) {
  req.session.user = null;
  res.end();
}
