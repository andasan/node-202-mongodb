const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findById('5ecd65cf5dee9cbe781c8258')
        .then(user => {
            console.log("Fetched user: ", user);
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//to check if you have installed dotenv package or if it's working
// console.log("Please don't hack my DB T^T : ",process.env.MONGODB_URL);
mongoConnect(() => {
    app.listen(3000);
});
