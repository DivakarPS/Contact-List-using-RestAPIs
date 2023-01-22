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

let contact_list = [
    {
        name : "Divakar",
        ph : "1234567890"
    }
];

app.get('/',function(req,res){
    console.log(req.url);
    return res.render('home',{
        title : "Contact List",
        contacts : contact_list
    });
})

app.get('/profile',function(req,res){
    return res.render('profile');
})

app.post('/create-contact',function(req,res){
    // contact_list.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name : req.body.name,
        phone : req.body.ph
        }
        , function(err, newContact){
        if(err){
            console.log("error:",err);
            return;
        }
        // console.log("********",newContact);
        return res.redirect('back');
    })
});

app.post('/delete-contact',function(req,res){
    var deleteName = req.body.del_name;
    const arr = contact_list.filter((x) => x.name!=deleteName);
    contact_list = arr;

    return res.render('home',{
        title : "Contact List",
        contacts : contact_list
    });
    // Contact.create(req.body, function(err, newContact){
    //     if(err){
    //         console.log("error:",err);
    //         return;
    //     }
    //     console.log("********",newContact);
    //     return res.redirect('back');
    // })
})


app.listen(port,function(err){
    if(err){
        console.log("error is:",err);
        return;
    }
    console.log("The server is up and running in port:",port);
})