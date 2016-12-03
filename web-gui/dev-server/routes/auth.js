exports.user = function (req, res) {
    if (req.session.user) {
        res.end(JSON.stringify(req.session.user));
    } else {
        res.statusCode = 204;
        res.end();
    }
};

exports.login = function (req, res, next) {
    if (req.body.username === 'test' && req.body.password === 'test') {
        req.session.user = {
            username: req.body.username,
            roles: ['BASIC', 'ADMIN']
        };

        res.end(JSON.stringify({
            success: true
        }));
    } else {
        res.end(JSON.stringify({
            success: false
        }));
    }
};

exports.logout = function (req, res, next) {
    req.session.user = null;
    res.end();
};