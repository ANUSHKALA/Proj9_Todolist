const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var tasks = [];

app.set("view engine", "ejs");

app.get("/", function (req,res){

    var today = new Date();
    var dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var daynum = today.getDay();


    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }

    var day = today.toLocaleDateString('en-US', options);


    console.log(dayName[daynum])

    res.render("list", {
        nameOfDay: day,
        listOfTasks : tasks,
    });
});

app.post("/",function (req,res){
    var newTask = req.body.newItem;
    tasks.push(newTask);
    res.redirect("/");
});


app.listen(3000, function (){
    console.log('This server is active on port 3000.')
})