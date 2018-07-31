const mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
     type: String, 
     required: true,
     minlength: 1,
     trim: true
    }
 });

//  let newUser = new User({
//     email: ' sirajbrepotra@example.com '
// });

// newUser.save().then((doc) => {
//     console.log('Saved user', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// })

//   let otherUser = new User({
//      email: '                  '
//  });

//  otherUser.save().then((doc) => {
//      console.log('Saved user', doc)
//  }, (e) => {
//      console.log('Unable to save todo')
//  })

 module.exports = {User};