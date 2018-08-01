const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 17
};


let token = jwt.sign(data, '51r4jbr3');
console.log(token);


let decoded = jwt.verify(token, '51r4jbr3')
console.log('decoded: ', decoded)

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