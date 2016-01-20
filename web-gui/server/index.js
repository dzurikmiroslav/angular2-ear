var path = require('path');
var connect = require('connect');
var connectLivereload = require('connect-livereload');
var serverStatic = require('serve-static');
var routes = require('./routes');

var root = process.argv[2];
var port = process.argv[3];

var app = connect();
app.use(connectLivereload());
app.use(serverStatic(path.join(process.cwd(), root)));
app.use('/web-service/rest', routes);

var server = app.listen(port, function() {
  var host = 'localhost';
  console.log('The mock server on http://%s:%s', host, port);
});