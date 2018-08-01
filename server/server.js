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
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {;
        res.status(400).send(e)
    })
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/:id
app.get('/todos/:id', (req,res) => {
    let id = req.params.id
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send({})
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id
    if (!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            res.status(404).send()
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req,res) => {
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

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});

// POST /users
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']); 
    const user = new User(body);



    user.save().then((data) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {;
        res.status(400).send(e)
    })
});

app.get('/users/me', authenticate, (req, res) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {

        }

        res.send(req.user);
    });    
});

app.post('/users/login', (req,res) => {
    let body = _.pick(req.body, ['email', 'password']); 
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {app};