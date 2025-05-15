import express from 'express';
import { createTask, listTask, deleteTask, changeStatusTask } from '../controllers/tarefa.js'
import { auth } from '../middlewares/usuario.js';

const routerTask = express.Router()

routerTask.post('/task', auth, createTask)
routerTask.get('/task', auth, listTask)
routerTask.delete('/task/:id', auth, deleteTask);
routerTask.put('/task/:id', auth, changeStatusTask);
routerTask.put('/task/:id/status', auth, changeStatusTask);


export default routerTask