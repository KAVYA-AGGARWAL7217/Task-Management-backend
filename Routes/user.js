const express = require('express');
const userController=require('../Controller/user')
const router=express.Router();

router
//Users
//read GET /Users
.get('/',userController.getAllUsers)
//reade GET /Users/:id
.get('/:id',userController.getUser)
//update Read PUT /Users/:id
.put('/:id',userController.replace)

//update patch /Users/:id
//in patch yeh properties modified ho jayengi bski vasi ki vasi rahengi
.patch('/:id',userController.updateUser)

//delete /:id
.delete('/:id',userController.deleteUser)

.get('/',(req,res)=>{
    res.send("<h1>hello</h1>")
})

exports.router=router;