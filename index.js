const express = require("express");
const app = express();
const companyData = require("./companyData");

const multer = require("multer");
const upload = multer();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// Mongoose connection here ----
const Mongoose = require("mongoose");
const connection = () => {
  Mongoose.connect("mongodb://127.0.0.1/MyWebsiteData")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log(e);
    });
};

var timeLeft = 5;
const timer = setInterval(() => {
  console.log("connecting in : " + timeLeft);
  timeLeft--;
  if (timeLeft <= 0) {
    connection();
    clearInterval(timer);
  }
}, 1000);

//creating schema
const schema = new Mongoose.Schema({
  FullName: String,
  Email: String,
  Phone_No: Number,
  City: String,
});

const Contact = Mongoose.model("Contact", schema);

//creating schema for new users
const regSchema = new Mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
});
//register model
const regModel = Mongoose.model("Signupdata", regSchema);

//-------------------
const path = require("path");
//view the engine on ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/r/:cats", (req, res) => {
  const { cats } = req.params;
  res.render("cats", { companyData });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await regModel
      .findOne({ Email: email, Password: password })
      .exec();
    if (User) {
      res.status(200).json({ message: "Success" });
    } else {
      res
        .status(200)
        .json({ message: "Invalid email or password. Try again!" });
    }
  } catch (e) {
    res.status(400).json({ Message: "Internal Server error!" });
  }
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.post("/register", upload.none(), async (req, res) => {
  const { First, Last, email, password } = req.body;

  const existingUser = await regModel.find({ Email: email }).exec();
  console.log(existingUser);

  try {
    if (existingUser.length > 0) {
      res.status(200).json({ Message: "Email already exists!" });
    } else {
      const newUser = new regModel({
        FirstName: First,
        LastName: Last,
        Email: email,
        Password: password,
      });
      await newUser.save();
      res.status(200).json({ Message: "User registered successfully!" });
    }
  } catch (e) {
    console.log("error occured while registering..");
    res.status(500).json({ e: "Internal server error!" });
  }
});

//contact
app.post("/contact", (req, res) => {
  const { fullname, Email, number, city } = req.body;
  //creating new contact class and passing the input data from contact to mongodb
  var data = new Contact({
    FullName: fullname,
    Email: Email,
    Phone_No: number,
    City: city,
  });
  data.save();
  res.redirect("contact");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
//render the joke
app.get("/joke", (req, res) => {
  res.render("joke");
});

//render the profile
app.get("/profile", (req, res) => {
  res.render("profile");
});

app.post("/demo", (req, res) => {
  const { name, age } = req.body;
  res.send(`Your pet name is ${name} and age is ${age} years`);
});
app.listen(3000, () => {
  console.log("connected to server at port 3000");
});
