const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');
const db = mongoose.connection;

db.once('error',console.error.bind(console,'error connecting to the db'));

db.on('open',function(){
    console.log('Successfully establish connection with the db');
})