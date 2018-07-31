const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

// const id = '5b605ffac8264429d412cf1411';

// if (!ObjectID.isValid(id)){
//     console.log(`${id} is not a valid ID`)
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo)
// })

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found')
//     }
//     console.log('Todo by ID', todo)
// }).catch((e) => console.log(e));

const userId = '5b603a04bfb94118e43d842e'

if (!ObjectID.isValid(userId)){
    console.log(`'${userId}' is not a valid ID`);
}

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User not found')
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
