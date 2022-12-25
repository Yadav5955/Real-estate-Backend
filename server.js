const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const addProperty = require('./routes/addproperty');
const loginPage = require('./routes/login');
const registerPage = require('./routes/register')
const Getproperty = require('./routes/get')
const jwt = require('jsonwebtoken')
dotenv.config();
const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use("/properties", (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err)  return res.status(403).send("User not authorized")
      req.user_mail = decoded
      next();
  })
  }else{
    res.send("User not authorized")
  }
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/properties/posts", addProperty);
app.use('/login', loginPage);
app.use('/register', registerPage)
app.use('/properties', Getproperty)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(process.env.PORT, () => {
  console.log("server is up at port 5000")
})   