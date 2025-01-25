
//Requiring dependencies
const express = require('express');
const mongoose = require('mongoose'); //mongoose for MongoDB
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const Listing = require('./models/listing');

//mongoose connection to DB
const DB = "wanderlust2";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  

//Using dependencies
const app = express();
app.use(express.urlencoded({extended:true})); //Post requers parser
app.set('views engine','ejs'); //view engine for ejs.
app.set("views",path.join(__dirname,"views")); //default folder for ejs template views.
app.use(express.static(path.join(__dirname,"public"))); //default public folder for static fiels
app.use(methodOverride('_method')); //method overide

//*********************** Routes start************************* */

//Roote route
app.get('/',(req,res)=>{
    res.send("server is working");
})

app.get('/testListing', async(req,res)=>{
    let listing1 = new Listing({
        title:"Beach",
        description:"This is like Helll",
        price:2000,
        location:"Maldeves",
        country:"India",
    });
    try{
    await listing1.save();
    res.send("listing1 is saved in db");
    }catch(err){
        console.log(err);
        res.send("some error");
    }
})









//*********************** Routes end************************* */

const port = 3000;
main().then(()=>{
    console.log(`connectd to: ${DB} DB`);
    app.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
})