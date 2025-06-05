import express from 'express'
import database from './database.js'
import 'dotenv/config'
import router from './routes/usuario.js'
import routerTask from './routes/tarefa.js'
import cors from 'cors' 

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://front-tasks-xli6.vercel.app'
  ],
  
  credentials: true,
}));
app.use(express.json())
app.use(router)
app.use(routerTask)

const start = async () => {
  try {
      await database.sync();
      console.log('Banco lincou');

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
      })
        } catch (error) {
      console.error("não conecto ao banco:", error);
  }
}
console.log(PORT);


start()

app.get('/', (req, res) => {    
      
  res.send('Aoba')
})
