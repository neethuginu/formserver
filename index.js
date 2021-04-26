const { json } = require('express');
const express = require('express');
const dataService = require('./service/data.services');
const session = require('express-session');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))

const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: false,

            statusCode: 422,
            message: "please login"
        })
    }
    else {
        next();
    }
}

app.post('/register', (req, res) => {
    // console.log(req.body);
    dataService.register(req.body.fname, req.body.lname, req.body.email, req.body.mobile, req.body.pswd, req.body.cpswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})
app.post('/login', (req, res) => {
    // console.log(req.body);
    dataService.login(req, req.body.email, req.body.pswd)
        .then(result => { res.status(result.statusCode).json(result) })

})
app.listen(3000, () => {
    console.log("server started at port 3000")
});
