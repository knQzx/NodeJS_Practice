const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // loadash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });

  // set header content type

  res.setHeader('Content-Type', 'text/plain');

  let path = './';
  let statusCode = 200;
  switch (req.url) {
    case '/':
      path += 'file.html'
      statusCode = 200;
      break;
    case '/about':
      path += 'file_2.html'
      statusCode = 200;
      break;
    case '/about-me':
      statusCode = 301;
      res.setHeader('Location', '/about');
      res.writeHead(statusCode, {"Content-Type": "text/html" });
      res.end();
      break;
    default:
      path += '404.html'
      statusCode = 404;
      break;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.writeHead(statusCode, {"Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(2000, 'localhost', () => {
  console.log('listening for requests on port 2000');
});
