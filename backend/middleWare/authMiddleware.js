import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const protect = async ( req , res , next ) => {
    try {
        const token = req.cookies.token

        if(!token){
            res.status(401)
            throw new Error(" User not authorized please login ")
        }
        
        const verified = await jwt.verify(token , process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where : {
                id:verified.id
            },
            select:{
                id: true, // Misalkan Anda ingin mengambil ID
                name: true,
                email: true,
                bio: true,
                photo: true,
                phone: true,
            }
        })
        if(!user){
            res.status(404)
            throw new Error("User Tidak di temukan ")
        }

        req.user = user 
        next()

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
}