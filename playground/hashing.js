const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '51r4jbr3!'

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// })

let hashedPassword = '$2a$10$HjUTqXWQZuWRKDJw.jSWReX2kd0BUPS7ufiVh4c7D5TzE0qaXcTkm';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});



// let data = {
//     id: 17
// };


// let token = jwt.sign(data, '51r4jbr3');
// console.log(token);


// let decoded = jwt.verify(token, '51r4jbr3')
// console.log('decoded: ', decoded)

// let message = 'I am user number 7';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed. Don\'t trust');
// }