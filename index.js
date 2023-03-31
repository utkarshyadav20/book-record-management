const express=require('express');

const app=express();

const PORT=8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({   //send and json does the same thing both send data in a json format
        message:"server is running"
    });
});
















app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route does not exist"
    });
});


app.listen(PORT,()=>{
    console.log(`Server is running at port :> ${PORT}`);
});