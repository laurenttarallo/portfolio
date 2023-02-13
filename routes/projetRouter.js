const express = require("express");
const projetModel = require("../models/projet.js");
const projetRouter = express.Router();
const routeGuard = require("../customDependances/authGuard");
const upload = require('../customDependances/multer')

// fonction asynchrone (qui ne s'execute pas en meme temps ) et derriere req (requete) , res (reponse)//
projetRouter.get("/projetReturn", async (req, res) => {
  try {
    res.redirect("/main");
    // res.render("main.twig");
  } catch (error) {
    res.send(err);
  }
});
projetRouter.post("/projetadd",upload.single('image'), async (req, res) => {
  try {
    req.body.image = req.file.filename
    let newProjet = new projetModel(req.body);
    await newProjet.save();
    res.redirect("/projetReturn");
  } catch (err) {
    res.send(err);
  }
});












// route pour avoir acces a ma page projet
// projetRouter.get("/addProject",routeGuard, async (req, res) => {
//   try {
//     res.render("addProject.twig");
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = projetRouter;
