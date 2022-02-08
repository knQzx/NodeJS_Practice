const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect to mongoDB
const dbURI = 'mongodb+srv://knqzx:qwerty123@node-tuts.dwffi.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected'))
  .catch((err) => console.log(err))


const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
    },
  body: {
    type: String,
    required: true
  }
}, { titmestamps: true });

const Blog = mongoose.model('Blog',  blogSchema);


// ADD to DataBase
// const name = new Blog({
//   title: 'name',
//   snippet: 'hello',
//   body: 'yeah'
// });
//
// name.save();


// FIND FROM DATABASE
// Blog.find()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(`Your error is: ${err}`);
//   })
