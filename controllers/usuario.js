import User from '../models/usuario.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const secret = process.env.SECRET_KEY

const registerUser = async (req, res) => {

    const { name, email, password } = req.body
    console.log(req.body);
    
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos D:' })
        }
        // verifica se user existe
        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já cadastrado D:' })
        }
        // cria o user no banco
        const user = await User.create({ name, email, password })
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso :D' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error })
    }
}
    
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if ( !email || !password) {
            return res.status(400).json({ message: 'Falta informação fi' })
        }
        // Buscar dados do usuario que está tentando fazer login 
        const searchUser = await User.findOne({ where: { email } })
        if (!searchUser) {
            return res.status(400).json({ message: 'User not found' })
        }
        // Verificar se a senha está correta
        const passwordMatch = searchUser.password
        const id = searchUser.id

        if (password !== passwordMatch) {
            return res.status(400).json({ message: 'Senha incorreta' })
        }
        // Gerar o token de autenticação
        const token = jwt.sign({ id }, secret, { expiresIn: '1h' })
        return res.status(200).json({ message: 'Login deu boa', token })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Deu ruim ao login' })
    }
}



export { registerUser, loginUser } 