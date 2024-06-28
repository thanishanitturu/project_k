const express=require("express")
const path=require("path")
const bcrypt=require("bcrypt")
const collectionuser=require("./configuser")
const collectioncommunity=require("./configcommunity")

const app=express()

//set ejs as a view engine
app.set("view engine","ejs")
//adding static folder path
app.use(express.static("public"))
//json
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>
{
    res.render("home")
})

app.get("/login",(req,res)=>
{
    res.render("login");
})

app.get("/userlogin",(req,res)=>
{
    res.render("userlogin")
})

app.get("/communitylogin",(req,res)=>
{
    res.render("communitylogin")
})

app.get("/signup",(req,res)=>
{
    res.render("signup")
})

app.get("/usersignup",(req,res)=>
{
    res.render("usersignup")
})

app.get("/communitysignup",(req,res)=>
{
    res.render("communitysignup")
})

app.post("/userlogin",async(req,res)=>
{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await collectionuser.findOne({name:req.body.username})
    if(!existingUser)
    {
        res.send("username doesn't exist")
    }
    const isPassword=await bcrypt.compare(req.body.password,existingUser.password)
    if(isPassword)
    {
        res.render("home")
    }
    else
    {
        res.send("wrong password")
    }


})

app.post("/communitylogin",async(req,res)=>
{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await collectioncommunity.findOne({name:req.body.username})
    if(!existingUser)
    {
        res.send("username doesn't exist")
    }
    const isPassword=await bcrypt.compare(req.body.password,existingUser.password)
    if(isPassword)
    {
        res.render("home")
    }
    else
    {
        res.send("wrong password")
    }


})

app.post("/usersignup",async(req,res)=>
{
    const data=new collectionuser({
        name:req.body.username,
        password:req.body.password
    })

    const existingUser=await collectionuser.findOne({name:data.name})
    if(existingUser)
    {
        res.send("user name already exists");
    }
    else
    {
        const saltRounds=10
        const hashPassword=await bcrypt.hash(data.password,saltRounds)
        data.password=hashPassword
        data.save();
    }

})


app.post("/communitysignup",async(req,res)=>
{
    const data=new collectioncommunity({
        name:req.body.username,
        password:req.body.password
    })

    const existingUser=await collectioncommunity.findOne({name:data.name})
    if(existingUser)
    {
        res.send("user name already exists");
    }
    else
    {
        const saltRounds=10
        const hashPassword=await bcrypt.hash(data.password,saltRounds)
        data.password=hashPassword
        data.save();
    }

})


const port=5000
app.listen(port,()=>
{
    console.log("server is running in port 5000")
})