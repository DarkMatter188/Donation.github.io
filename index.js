const express=require('express');
const app=express();

var paytm_func=require('./routes.js');
paytm_func(app);
app.listen(3000,(req,res)=>{
    console.log("Server listening on port 3000"); 
})