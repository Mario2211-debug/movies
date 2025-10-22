import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const dbConnect = async () => {
    try {
    
        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
            bufferCommands: false, 
        };

        await mongoose.connect(MONGO_URI, options);
        console.log("✅ Base de dados conectada com sucesso")   
    } catch (error) {
        console.error("❌ Erro ao conectar com a base de dados:", error)
        process.exit(1); // Encerrar processo se não conseguir conectar
    }
}

// mongoose.connect(
//     console.log("Base de dados conectadad com sucesso!")
// ).then().catch( err => console.log(err))