require('./config/config.js');



const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose} = require ('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate');


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', authenticate, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    try{
        const doc = await todo.save()
        res.send(doc)
    } catch (e) {
        res.status(400).send(e)
    }
    // todo.save().then((doc) => {
    //     res.send(doc)
    // }, (e) => {;
    //     res.status(400).send(e)
    // })
});

// GET /todos
app.get('/todos', authenticate, async (req, res) => {

    try {
        const todos = await Todo.find({_creator: req.user._id})
        return res.send({todos})
    } catch(e) {
        res.status(400).send(e)
    }



    // Todo.find({
    //     _creator: req.user._id
    // }).then((todos) => {
    //     res.send({todos})
    // }, (e) => {
    //     res.status(400).send(e);
    // });
});

// GET /todos/:id
app.get('/todos/:id', authenticate, async (req,res) => {
    let id = req.params.id
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }

    try{
        const todo = await Todo.findOne({_id: id, _creator: req.user._id})
        if(!todo) {
            res.status(404).send({})
        };
        res.send({todo})
    } catch(e) {
        res.status(400).send()
    };


    // Todo.findOne({
    //     _id: id,
    //     _creator: req.user._id
    // }).then((todo) => {
    //     if(!todo){
    //         res.status(404).send({})
    //     }
    //     res.status(200).send({todo}); 
    // }).catch((e) => {
    //     res.status(400).send()
    // });
});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, async (req, res) => {
    
        const id = req.params.id
        if (!ObjectID.isValid(id)){
           return res.status(404).send();
        }
        try{
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        if(!todo){
            res.status(404).send()
        }
        res.send({todo})
    } catch(e) {
        res.status(400).send()

    }
    

    // if (!ObjectID.isValid(id)){
    //     res.status(404).send();
    // }

    // Todo.findOneAndRemove({
    //     _id: id,
    //     _creator: req.user._id
    // }).then((todo) => {
    //     if(!todo){
    //         res.status(404).send()
    //     }

    //     res.send({todo});
    // }).catch((e) => {
    //     res.status(400).send()
    // });
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, async (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    try {
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user.id
        }, {
        $set: body
        }, {
        new: true
        })
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo})
    } catch(e) {
        res.status(400).send()
    }
    // Todo.findOneAndUpdate({
    //     _id: id,
    //     _creator: req.user.id
    // }, {$set: body}, {new: true}).then((todo) => {
    //     if(!todo){
    //         return res.status(404).send();
    //     }
    //     res.send({todo});
    // }).catch((e) => {
    //     res.status(400).send()
    // });
});

// POST /users
app.post('/users', async (req, res) => {
    try{
        let body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        await user.save();
        const token = await user.generateAuthToken()
        res.header('x-auth', token).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
    // let body = _.pick(req.body, ['email', 'password']); 
    // const user = new User(body);
    // user.save().then(() => {
    //     return user.generateAuthToken();
    // }).then((token) => {
    //     res.header('x-auth', token).send(user);
    // }).catch((e) => {;
    //     res.status(400).send(e)
    // })
});

app.get('/users/me', authenticate, async (req, res) => {
    let token = req.header('x-auth');

    try{
        const user = await User.findByToken(token)
        if (!user){
            res.status(400).send()
        }
            res.send(req.user);

    } catch(e) {
        res.status(404).send(e)

    }

    // User.findByToken(token).then((user) => {
    //     if (!user) {

    //     }

    //     res.send(req.user);
    // });    
});

app.post('/users/login', async (req,res) => {
    try{
        let body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password)
        const token = await user.generateAuthToken()
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send(e)
    }
    // let body = _.pick(req.body, ['email', 'password']); 
    // User.findByCredentials(body.email, body.password).then((user) => {
    //     return user.generateAuthToken().then((token) => {
    //         res.header('x-auth', token).send(user);
    //     });
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


app.delete('/users/me/token', authenticate, async (req,res) => {
    try {
    await req.user.removeToken(req.token);
    res.status(200).send();
    } catch(e) {
        res.status(400).send();
    }
    // req.user.removeToken(req.token).then(() => {
    //     res.status(200).send();
    // }, () => {
    //     res.status(400).send();

    // });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {app};