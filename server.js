var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.send(req.testing);
});

app.ws('/path', function(ws, req) {
  ws.on('message', function(msg) {
    console.log('Received message from client:', msg);
    setTimeout(()=>{
        ws.send('Echo: ' + msg);
    },20000); 
    console.log(msg + " Inside");
  });
  console.log('socket', req.testing);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
