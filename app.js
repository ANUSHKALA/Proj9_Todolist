const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require("mongoose");

console.log(date.getDate());

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB");

const todolistSchema = {
    name:{
        type: String,
    },
    // status:{
    //     type: Boolean
    // },
    // category: "String"
}

const Item = mongoose.model("Item",todolistSchema);

const study = new Item({
    name: "Study hard"
})

const shop = new Item({
    name: "Go Shopping"
})

const play = new Item({
    name: "Play"
})




app.set("view engine", "ejs");


app.get("/category", function (req,res){

    Item.find({},function (err,results){
        if(err){
            console.log(err);
        }
        else{

            if(results.length === 0){
                Item.insertMany([study,shop,play],function (err){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Successfully add items to todolist")
                    }
                })            
            }
            res.render("list", {
                listName: "Category",
                taskList : results,
            });
        }
    })


});

app.post("/category",function (req,res){

    // const rout = "/"+;


    var itemName = req.body.newItem;

    const item = new Item({
        name: itemName,
    })
    item.save();
    res.redirect("/category");
});

app.post("/delete",function (req,res){
    const doneTaskId = (req.body.doneBox);

    Item.findByIdAndRemove(doneTaskId,function (err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Item deleted successfully!")
        }
    })
    res.redirect("/category");

})



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