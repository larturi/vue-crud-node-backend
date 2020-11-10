const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// Conexion a DB
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/udemyvue';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
    () => { console.log('Conectado a MongoDB'); },
    err => { console.log(err); }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3002);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});