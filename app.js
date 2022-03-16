const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

console.log(date.getDate());

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));

var defaultList = [];
var workList = [];



app.set("view engine", "ejs");




app.get("/default", function (req,res){

    var today = new Date();
    // var dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    // var daynum = today.getDay();


    res.render("list", {
        listName: "Default",
        taskList : defaultList,
    });
});

app.post("/default",function (req,res){

    // const rout = "/"+;


    var newTask = req.body.newItem;
    defaultList.push(newTask);
    res.redirect("/default");
});



app.get("/work",function (req,res){
    res.render('list',{
        listName:'Work',
        taskList: workList,
    })
})

app.post("/work", function (req,res){
    var newTask = req.body.newItem;
    workList.push(newTask);
    res.redirect("/work");
})


app.listen(3000, function (){
    console.log('This server is active on port 3000.')
})