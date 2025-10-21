import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const dbConnect = async () => {
    try {
        mongoose.connect(MONGO_URI)
        console.log("✅ Base de dados conectada com sucesso")   
        } catch (error) {
            console.error("Erro ao conectar", error)
        }
}

// mongoose.connect(
//     console.log("Base de dados conectadad com sucesso!")
// ).then().catch( err => console.log(err))