const express = require('express');
const db = require('./config/mongoose');
const Contact = require("./models/contact");

const app = express();
const port = 3000;
const path = require('path');
const bodyParse = require('body-parser');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParse.urlencoded());
app.use(express.static('assets'));


app.get('/',function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
})

app.get('/profile',function(req,res){
    return res.render('profile');
})

app.post('/create-contact',function(req,res){
   
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
        }
        , function(err, newContact){
        if(err){
            console.log("error:",err);
            return;
        }
         console.log("********",newContact);
        Contact.find({}, function(err, contacts){
            if(err){
                console.log("error in fetching contacts from db");
                return;
            }
            return res.render('home',{
                title: "Contact List",
                contact_list: contacts
            });
    
        })
    });
});

app.get('/delete-contact',function(req,res){

    console.log(req.query);
    let id=req.query.id;
    
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting the name:",req.query.name);
            return;
        }
        Contact.find({}, function(err, contacts){
            if(err){
                console.log("error in fetching contacts from db");
                return;
            }
            return res.render('home',{
                title: "Contact List",
                contact_list: contacts
            });
    
        })
    });

});


app.listen(port,function(err){
    if(err){
        console.log("error is:",err);
        return;
    }
    console.log("The server is up and running in port:",port);
})
