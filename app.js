const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
// ----------------------------------------- EJS ----------------
app.set("view engine","ejs");
app.use(express.static("public"));

var items = ["Buy Food","Cook Food","Eat Food"]
let workItems = [];
// ------------------ROOT -----------------
app.get("/",function(req,res){
  var today = new Date();
  var currentDay = today.getDay();
  var day="";

  var options = {
    weekday : "long",
    day   : "numeric",
    month : "long"
  }
  day = today.toLocaleDateString("en-IN",options)
  res.render("list",{listTitle : day , newItem : items });
})

app.post("/",function(req,res){
  let input1 = req.body.input1;
  if (req.body.list === "work"){
    workItems.push(input1);
    res.render("/work");
  }else{
    items.push(input1);
    res.redirect("/")
  }
})
// ------------------- WORK --------------
app.get("/work",function(req,res){
  res.render("list",{ listTitle : "Work List", newItem : workItems })
})
app.post("/work",function(req,res){
  let input1 = req.body.input1;
  workitems.push(input1);
  res.redirect("/work")
})
// ---------------- ABOUT ME ---------
app.get("/about",function(req,res){
  res.render("about")
})


app.listen(3000,function(){
  console.log("server is up and running");
})
