// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err){
        console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    //deleteMany
    // db.collection('Users').deleteMany({name: 'Siraj Brepotra'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat beans'}).then((result)=>{
    //     console.log(result);
    // });
    //findOneAndDelete
    // db.collection('Users').findOneAndDelete({_id: 197}).then((result)=>{
    //         console.log(result);
    // });

    //db.close();
});