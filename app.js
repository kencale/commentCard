var express = require ("express"),
bodyParser = require("body-parser"),
mongoose = require ("mongoose")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app = express();
//app config
mongoose.connect("mongodb://localhost/commentCard",{ useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));





// mongoose database / model config
var commentSchema = new mongoose.Schema({
    serviceType: String,
    body: String,
    commentType: String,
    created: {type:Date, default: Date.now}
    });
var Comments = mongoose.model("Comments", commentSchema);


//Comment.create({
//    title: "Test Comment",
//   body:"This is a test comment"
//
//});

//commentCard Routes
app.get("/",function(req,res){
    res.render("index");
});

app.get("/dashboard", function(req,res){
        Comments.find({},function(err,dashboard){
              if(err){
                 console.log("error");
              }else{
                 res.render("dashboard", {dashboard:dashboard});
              }
        });
   //     res.render("index");
});

//new comment route
app.get("/comment", function(req,res){
        res.render("comment");
});

//create route
app.post("/comment", function(req,res){
         Comments.create(req.body.comment, function(err,newComment){
                         console.log(req);
             if (err){
                 res.render("/comment");
             }else{
             res.render("submitted");
             }
         })
 });

const PORT= process.env.PORT || 5000;
app.listen(PORT, function(){
           console.log("server is connected, running");
           });
