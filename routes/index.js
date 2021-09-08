const express = require('express');
const router = express.Router();

const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer);

// Server에서 매 1초마다 'hello'라는 이벤트 명으로 Client에 전송
io.on('connect', socket => {
  let counter = 0;
  setInterval(() => {
    socket.emit('hello', ++counter);
  }, 1000);
  console.log('connect');
});


io.on('connect', socket => {
  socket.on('hey', data => {
    console.log('hey', data);
  });
});

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
