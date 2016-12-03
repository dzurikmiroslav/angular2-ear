var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../config/webpack.dev');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var routes = require('./routes');

var compiler = Webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    stats: {
        colors: true
    },
    setup: function (app) {
        app.use(cookieSession({
            keys: ['secret1', 'secret2']
        }));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use('/web-service/rest', routes);
    }
});

server.listen(8888, '127.0.0.1', function () {
    console.log('Starting dev server on http://localhost:8888');
});