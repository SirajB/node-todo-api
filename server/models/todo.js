const mongoose = require('mongoose')



let Todo = mongoose.model('Todo', {
   text: {
    type: String, 
    required: true,
    minlength: 1,
    trim: true
   },
   completed: {
    type: Boolean,
    default: false
   },
   completedAt: {
    type: Number,
    default: null
   }
});

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

module.exports = {Todo};