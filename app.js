const express = require('express');
const cors = require('cors');
const DB = require('./services/DB');
const env = require('dotenv');
const UserRouter = require('./routes/user.routes');
const MovieRouter = require('./routes/movies.routes');
const SMS = require('./services/SMS')

const PORT = process.env.PORT || 6969;
const app = express();

env.config();
DB.connectToDB();

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(MovieRouter);

app.get('/', (req, res)=> {res.send({status:'your application running success :)'})});
app.get('/sample', (req, res)=> {res.send({status:'this is sample api'})});

app.get('/reg/otpcall/:mobile', SMS.sendOtp);

app.listen(PORT, ()=> {console.log('=> server started on port: ', PORT)})
