const express = require('express');
const app = express();


// Mongoose connection here ----
const Mongoose = require('mongoose');
const connection = ()=>{
 Mongoose.connect('mongodb://127.0.0.1/ContactData').then(()=>{
    console.log('Connected to MongoDB');
 })
 .catch(e=>{
    console.log(e);
 })
}

var timeLeft = 5;
const timer = setInterval(()=>{
console.log('connecting in : '+timeLeft);
timeLeft--;
if(timeLeft <=0){
    connection();
    clearInterval(timer);
}

},1000);

//creating schema
const schema = new Mongoose.Schema({
    FullName :String,
    Email:String,
    Phone_No:Number,
    City:String
});

const  Contact = Mongoose.model('Contact',schema);


//-------------------
const path = require('path');
//setting the path on view directory
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.render('signup');
})

app.get('/login',(req,res)=>{
    res.send("hello")
})

//view the engine on ejs
app.set('view engine','ejs'); 
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())


//contact
app.post('/contact',(req,res)=>{
    const {fullname,Email,number,city} = req.body;
    //creating new contact class and passing the input data from contact to mongodb
    var data = new Contact({FullName : fullname,Email:Email,Phone_No :number,City:city});
    data.save();
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
//render the joke
app.get('/joke',(req,res)=>{
    res.render('joke');
})

//render the profile
app.get('/profile',(req,res)=>{
    res.render('profile')
})

app.listen(3000,()=>{
    console.log('connected to server at port 3000');
})