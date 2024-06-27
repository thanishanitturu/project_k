const express=require("express")
const path=require("path")
const bcrypt=require("bcrypt")
const collection=require("./config")

const app=express()

//set ejs as a view engine
app.set("view engine","ejs")
//adding static folder path
app.use(express.static("public"))
//json
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.get("/login",(req,res)=>
{
    res.render("login");
})

app.get("/signup",(req,res)=>
{
    res.render("signup")
})

app.post("/signup",async(req,res)=>
{
    const data=new collection({
        name:req.body.username,
        password:req.body.password
    })

    const existingUser=await collection.findOne({name:data.name})
    if(existingUser)
    {
        res.send("user name already exists");
    }
    else
    {
        data.save();
    }

})


const port=4000
app.listen(port,()=>
{
    console.log("server is running in port 4000")
})