const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel = require("../models/user.js");
const userRouter = express.Router();
const nodemailer = require("nodemailer");
const projetModel = require("../models/projet.js");
const {body,validationResult} = require("express-validator");
const routeGuard = require("../customDependances/authGuard");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fonsat.nodemailer@gmail.com",
    pass: "dlclhbrybfcawlgi",
  },
});


// userRouter.get("/users", async(req.res)=>{
//   let users = await UserModel.find()
//   res.render('main.twig' ,{
//     users : users
//   })
// })
//route sans try/catch //

userRouter.get("/main", async (req, res) => {
  try {
    let users = await UserModel.find();
    let projects = await projetModel.find();
    res.render("main.twig", {
      users: users,
      projects: projects,
    });

  } catch (err) {
    res.send(err);
  }
});
//
// route pour aller de mon portfolio a ma page login
userRouter.get("/login", async (req, res) => {
  try {
    res.render("login.twig");
  } catch (error) {
    res.send(error);
  }
});
// route pour avoir acces a ma page projet
userRouter.get("/addProject", routeGuard, async (req, res) => {
   try {
     res.render("addProject.twig");
   } catch (error) {
     res.send(error);
   }
 });

//  route pour envoyer un mail sur ma boite
userRouter.post("/sendMail", async (req, res) => {
  console.log(req.body);
  try {
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: "laurent.tarallo23@orange.fr", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "de: " + req.body.email + " " + req.body.message, // plain text body
    });
    res.redirect("/projetReturn");
  } catch (err) {
    res.send(err);
  }
});
//route pour comparer la saisie dans les inputs a ma base de donnée (mongo) et donner l'acces ou pas
userRouter.post("/loginPass",[
  body("password").trim(),
  body("password2").custom((value,{req})=>{
    if (value !== req.body.password){
      throw new Error('les mots de passe ne correspondent pas !')
    }
    return true
  })
], async (req, res) => {
  // console.log(req.body);
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors);
      errors.array().forEach((error)=>{
        req.session.error = error.msg
      })
      res.render("login.twig", {message :req.session.error})
      return
    }else{
      let user = await UserModel.findOne({
        name: req.body.name
      });
      
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          req.session.userId = user._id
         
          
          res.redirect('/addProject')
       }else{
          res.redirect('/main')
       }
       
      } else {
        res.send("vous etes pas connecté");
      }

    }

  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//route pour ajouter un nouvel utilisateur dans ma bdd
userRouter.post("/adduser", async (req, res) => {
  try {
    let newUser = new UserModel(req.body);
    await newUser.save();
    res.send("sauvergarde ok");
  } catch (error) {
    res.send(err);
  }
});



//A SUPPRIMER // POUR SUPPRIMER LA FONCTION APRES UPLOAD
// userRouter.get('/log', async (req, res) => {
//    let myid = "63c142bde39e02b6fee17b3b"
//    let password = "0705!"

//    bcrypt.hash(password, saltRounds,async function (err, hash) {
//       let body = {
//          password : hash
//       }
//       console.log(body);
//       try {
//          await UserModel.updateOne({ _id: myid }, body)
//          res.redirect('/main')
//       } catch (error) {
         
//       }

//    });
// });












/* let user = await UserModel.findOne({
  name: req.body.name
});

if (user) {
  if (await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id
   
    
    res.redirect('/addProject')
 }else{
    res.redirect('/main')
 }
 
} else {
  res.send("vous etes pas connecté");
}*/




module.exports = userRouter;
