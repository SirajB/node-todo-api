const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// let Todo = mongoose.model('Todo', {
//    text: {
//     type: String, 
//     required: true,
//     minlength: 1,
//     trim: true
//    },
//    completed: {
//     type: Boolean,
//     default: false
//    },
//    completedAt: {
//     type: Number,
//     default: null
//    }
// });

// let firstNewTodo = new Todo({
//     text: 'Cook ramen'
// });

// firstNewTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// });

// let secondNewTodo = new Todo ({
//     text: 'something to do'
// })

// secondNewTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// });

let User = mongoose.model('User', {
    text: {
     type: String, 
     required: true,
     minlength: 1,
     trim: true
    }
 });

 let newUser = new User({
     text: ' sirajbrepotra@example.com '
 });

 newUser.save().then((doc) => {
     console.log('Saved user', doc)
 }, (e) => {
     console.log('Unable to save todo')
 })
 
//   let otherUser = new User({
//      text: '                  '
//  });

//  otherUser.save().then((doc) => {
//      console.log('Saved user', doc)
//  }, (e) => {
//      console.log('Unable to save todo')
//  })
 