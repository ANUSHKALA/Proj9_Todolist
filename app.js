const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");

app.get("/", function (req,res){

    var today = new Date();
    var dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var daynum = today.getDay();
    console.log(dayName[daynum])

    res.render("list", {
        nameOfDay: dayName[daynum]
    });  
});

app.listen(3000, function (){
    console.log('This server is active on port 3000.')
})