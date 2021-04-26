const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Database",{useNewUrlParser:true,useUnifiedTopology: true})
const Data=mongoose.model('Data',{
     fname:String,
      lname:String,
       email: String,
       mobile:Number,
        password: String,
        cpassword:String
})
module.exports ={
    Data
};