const express=require('express');
const taskController=require('../Controller/task');
const router=express.Router();
router
.get('/',taskController.getTasks)
.get('/:id',taskController.getTask)
.patch('/:id',taskController.updateTask)
.delete('/:id',taskController.deleteTask)
.post('/',taskController.createTask);
exports.router=router;