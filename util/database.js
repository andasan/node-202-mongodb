const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = () => {
    MongoClient.connect(process.env.MONGODB_URL)
    .then(client =>{ 
        console.log(client)
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect;