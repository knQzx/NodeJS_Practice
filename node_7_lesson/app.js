const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  const blogs = [
    {title: 'You', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    {title: 'ME', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    {title: 'FS', snippet: 'Lorem ipsum dolor sit amet, consectetur'}
  ];
  res.render('index', { title: 'HOME', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'ABOUT' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'CREATE' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});
