const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js')
const projetRouter = require ('./routes/projetRouter.js')
require('dotenv').config()  

const db = process.env.BDD_URL //path bdd a mettre ici
const app = express()
const session = require('express-session')

//BIEN RESPECTER L ORDRE POUR NE PAS AVOIR D ERREURS D AFFICHAGE//

app.use(session({secret: "test",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(projetRouter)
app.use(userRouter)



app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})














