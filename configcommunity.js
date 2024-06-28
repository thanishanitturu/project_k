const mongoose=require("mongoose")
const connect=mongoose.connect("mongodb://localhost:27017/login-turt");

connect.then(()=>
{
    console.log("Database successfully connected with community")
})

const LoginSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
        },
        password:
        {
            type:String,
            required:true,
        }
    }
);

const collection=new mongoose.model("community",LoginSchema)

module.exports=collection;