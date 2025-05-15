import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const database = new Sequelize(process.env.DB, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

async function testConnection() {
    try {
        await database.authenticate()
        console.log('Conectado ao DB');   
    } catch (error) {
        console.log('Deu ruim a conexão:', error);
    }
}

testConnection()

export default database