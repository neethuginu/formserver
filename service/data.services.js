const db = require('./db');

let accountDetails = {
    1000: { fname: "neethu",lname:"jinu",email: "neethu@gmail.com", mobile: "658741255",password:"123" },
    1000: { fname: "jinu",lname:"jinu",email: "jinu@gmail.com", mobile: "658742255",password:"321" },
}
let currentUser;
//   arrow functon
const register = (fname, lname, email,mobile,pswd,cpswd) => {
    return db.Data.findOne({
       email
    }).then(user => {
        console.log(user)
        if (user) {
            return {
                status: false,
                statusCode: 422,
                message: "user already exit,pls login"

            }
        }
        else {
            const newData = new db.Data({
                fname,
                lname,
                email,
                mobile,
                pswd,
                cpswd
            });
            newData.save();
            return {
                status: true,
                statusCode: 200,
                message: "succesfully registered"

            }
        }
    })
}


const login = (req, email, password) => {
    // var email = parseInt(email);
    return db.Data.findOne({
        email,
        password
    }).then(user => {
        if (user) {
            req.session.currentUser = user.email
            return {
                status: true,
                statusCode: 200,
                message: "Login successful",
                name:user.email
            }
        }
        return {
            status: false,
            statusCode: 422,
            message: "inavalid credentials"

        }
    })
}


