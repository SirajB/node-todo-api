const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

//Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

//Todo.findOneAndRemove({_id:55fhw348vdj234}).then((todo) => { 
    //----> useful for finding something when you need more than the id to specify it

// })

//Todo.findByIdAndRemove('55fhw348vdj234').then((todo) => { 
    //-----> only id

// })