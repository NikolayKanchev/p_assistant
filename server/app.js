const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const childrenRoutes = require('./api/routes/children');
const categoriesRoutes = require('./api/routes/categories');
const usersRoutes = require('./api/routes/users');
const itemsRoutes = require('./api/routes/items');


mongoose.connect('mongodb+srv://pa-admin:'+ process.env.MONGO_PW +'@p-assistant-abov2.mongodb.net/test?retryWrites=true&w=majority', {
   useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use( '/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/children', childrenRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not found !');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;