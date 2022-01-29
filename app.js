const express     = require("express");
const bodyParser  = require("body-parser");
const ejs         = require("ejs");
const _           = require("lodash");
const mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true, useUnifiedTopology: true});

const blogSchema = new mongoose.Schema({
                Title   : String,
                content : String
}),

Blog = mongoose.model("Blog",blogSchema);


const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu facilisis nisi. Praesent suscipit orci sit amet quam pharetra posuere et quis turpis. Curabitur volutpat lectus consequat semper varius. Morbi sem ante, tempus a posuere non, iaculis et metus. Suspendisse malesuada fermentum pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla fermentum mollis ipsum non efficitur. Quisque at imperdiet justo. Sed tempus ullamcorper mi, et dapibus massa fermentum quis. In tincidunt, turpis eget ultrices ultrices, orci lectus ultricies sapien, ac tincidunt libero lacus id velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";
const aboutContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu facilisis nisi. Praesent suscipit orci sit amet quam pharetra posuere et quis turpis. Curabitur volutpat lectus consequat semper varius. Morbi sem ante, tempus a posuere non, iaculis et metus. Suspendisse malesuada fermentum pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla fermentum mollis ipsum non efficitur. Quisque at imperdiet justo. Sed tempus ullamcorper mi, et dapibus massa fermentum quis. In tincidunt, turpis eget ultrices ultrices, orci lectus ultricies sapien, ac tincidunt libero lacus id velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";
const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu facilisis nisi. Praesent suscipit orci sit amet quam pharetra posuere et quis turpis. Curabitur volutpat lectus consequat semper varius. Morbi sem ante, tempus a posuere non, iaculis et metus. Suspendisse malesuada fermentum pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla fermentum mollis ipsum non efficitur. Quisque at imperdiet justo. Sed tempus ullamcorper mi, et dapibus massa fermentum quis. In tincidunt, turpis eget ultrices ultrices, orci lectus ultricies sapien, ac tincidunt libero lacus id velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

const app   = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
        Blog.find({},function(err,result){
            if(err)console.log(err);
            else{
                console.log(result)
                res.render("home",{
                    homeStartingContent:homeStartingContent,
                    posts:result
                }) 
            }
        })
            
});

app.get("/about",function(req,res){
    res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
    res.render("contact",{contactContent:contactContent});
})


app.get("/compose",function(req,res){
    res.render("compose");
})


app.post("/compose",function(req,res){
    const blog = new Blog({
        Title : req.body.postTitle ,
        content  : req.body.postBody
    });
    blog.save()
    res.redirect("/");
})

app.get("/posts/:blog",function(req,res){
    const x =_.lowerCase(req.params.blog);
    Blog.find({},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            result.forEach(function(post){
                const y = _.lowerCase(post.Title);
                
                if(x===y){
                    res.render("post",{
                        heading  : post.Title,
                        theory   : post.Content
                    })
                }
            })
        }
    })
});


app.listen(5000,function(req,res){
    console.log("Server has Started");
})