const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test dodo'
}];

//Runs before describe below, wipes database so that we our test is correct
beforeEach((done) => {
    Todo.remove({}).then(() =>{
        Todo.insertMany(todos);
    }).then(() => done()) // .then(() => { done() })
});


describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text}) //text = text
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });



    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e))
        })
    })
});

describe ('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});