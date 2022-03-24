import dotenv from 'dotenv'

dotenv.config()

export const config = {
    "API_HOST": process.env.API_HOST,
    "API_USER": process.env.API_USER,
    "API_PASSWORD": process.env.API_PASSWORD,
    "API_PORT": process.env.API_PORT,
    "API_DATABASE": process.env.API_DATABASE, 
    "NODE_PORT": process.env.PORT, 
}