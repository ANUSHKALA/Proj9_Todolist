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

const defaultList = [study,shop,play];


app.set("view engine", "ejs");


app.get("/today", function (req,res){

    Item.find({},function (err,results){
        if(err){
            console.log(err);
        }
        else{

            if(results.length === 0){
                Item.insertMany(defaultList,function (err){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("Successfully add items to todolist")
                    }
                })            
            }
            res.render("list", {
                listName: "Today",
                taskList : results,
            });
        }
    })
});

app.post("/today",function (req,res){


    const itemName = req.body.newItem;
    const title = req.body.add;

    const item = new Item({
        name: itemName,
    })

    if(title === "Today"){
        item.save();
        console.log(title)
        res.redirect("/today");
    }
    else{
        List.findOne({name: title}, function (err,foundList){
            if(err){
                console.log(err);
            }
            foundList.items.push(item);
            foundList.save();
            res.redirect("/category/"+title);
        })
    }

});

app.post("/delete",function (req,res){
    const doneTaskId = (req.body.doneBox);
    const title = req.body.add;

    if(title === "Today"){
        Item.findByIdAndRemove(doneTaskId,function (err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Item deleted successfully!")
            }
        })
        res.redirect("/today");
    }
    else{
        List.findOneAndUpdate({
            name: title
        },
        {
            $pull: {items: {_id: doneTaskId}}
        },
        function (err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/category/"+title)
                console.log("Item deleted successfully from custom list!")
            }
        });
    }
})



// app.get("/:category",function (req,res){
//     const cat = req.params.category;

//     res.render("category")
// })


const listSchema = {
    name : String,
    items : [todolistSchema]
}

const List = mongoose.model("List",listSchema)


app.get("/category/:category",function (req,res){
    const cat = req.params.category;



    List.findOne({name:cat}, function (err, foundList){
        if(err){
            console.log(err)
        }
        else{
            if(!foundList){
                const list = new List({
                    name: cat,
                    items: defaultList,
                })
                list.save();
                res.redirect("/"+cat)
            }
            else{
                res.render("list", {
                    listName: foundList.name,
                    taskList : foundList.items,
                });            
            }
        }
    })
});





app.listen(3000, function (){
    console.log('This server is active on port 3000.')
})