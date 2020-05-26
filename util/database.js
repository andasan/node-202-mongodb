const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

exports.mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected!');
        db = client.db('shop')
        callback();
    })
    .catch(err => {
        console.log('Error in mongoConnect: ',err);
    })
}

exports.getDB = () => {
    if(db) {
        return db;
    }
    else{
        throw 'No database found!';
    }
};


// const mongoConnect = () => {
//     MongoClient.connect(process.env.MONGODB_URL)
//     .then(client =>{ 
//         console.log(client)
//     })
//     .catch(err => console.log(err))
// }

// module.exports = mongoConnect;