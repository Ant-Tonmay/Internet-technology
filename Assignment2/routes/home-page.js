const router = require('express').Router()

router.get("/",async(req,res)=>{
    res.render('home-page');
})

module.exports=router