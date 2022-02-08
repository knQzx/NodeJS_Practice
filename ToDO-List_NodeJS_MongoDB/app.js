const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// url our mongoDB
const dbURI = 'mongodb+srv://knqzx:qwerty123@node-tuts.dwffi.mongodb.net/node-tuts?retryWrites=true&w=majority';

// connect to mongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// main page
app.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      console.log(result)
      res.render('todo', { blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
});


// check post "/delete_blog"
app.post('/delete_blog', (req, res) => {
  // delete and find by id
  Blog.findByIdAndDelete(Object.keys(req.body)[0])
    .then(result => {
      // redirect
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
})


// post request "/blogs"
app.post('/blogs', (req, res) => {
  // check 6 lists in object

  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      // allow
      if (result.length + 1 <= 7) {
        // new object
        const blog = new Blog(req.body);
        // save
        blog.save()
          .then(result => {
            // redirect to "/"
            res.redirect('/');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.redirect('/');
      }
    })
    .catch(err => {
      console.log(err);
    });
  //
});
