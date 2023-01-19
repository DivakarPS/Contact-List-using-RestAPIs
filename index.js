const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    console.log(req.url);
    return res.send("This is home page!");
})




app.listen(port,function(err){
    if(err){
        console.log("error is:",err);
        return;
    }
    console.log("The server is up and running in port:",port);
})