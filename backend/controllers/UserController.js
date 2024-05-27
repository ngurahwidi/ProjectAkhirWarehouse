import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

const generateJwt = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "1d"})
}


export const registerUser = async (req, res , next) => {
    const { name, email, password } = req.body;

    try {
        // Validasi
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Isi data dengan benar");
        }

        if (password.length < 6) {
            res.status(400);
            throw new Error("Password minimal 6 karakter");
        }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error("Format email tidak valid");
        }

        // Periksa apakah email sudah digunakan
      const userExists = await prisma.user.findUnique({ where: { email } });

        if (userExists) {
            res.status(400);
            throw new Error("Email pengguna sudah ada");
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate token JWT
        const token = generateJwt(user.id);

        // Kirim cookie HTTP-only
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 hari
            sameSite: "none",
            secure: true,
        });

        // Kirim respons
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            photo: user.photo,
            phone: user.phone,
            token,
        });

    } catch (error) {
        // Tangani kesalahan
        next(error)
    }
};


export const loginUser = async (req,res , next) => {
  const {email , password } = req.body
  try {
    
    //validasi 
    if(!email || !password ){
      res.status(400)
      throw new Error ("Email atau Password harus di isi ")
    }

    if (password.length < 6) {
            res.status(400);
            throw new Error("Password minimal 6 karakter");
        }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error("Format email tidak valid");
        }

        // cari email 
        const userExist = await prisma.user.findUnique({where :{ email } })
        if(!userExist){
          res.status(400)
          throw new Error ("User Tidak di temukan , Registrasi terlebih dahulu ")
        }

        // compare password 
        const passwordIsCorrect = await bcrypt.compare(password,userExist.password)

        //generate token
        const token = generateJwt(userExist.id)

          // Kirim cookie HTTP-only
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 hari
            sameSite: "none",
            secure: true,
        });

        if(passwordIsCorrect){
         
          return res.status(201).json({
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            bio: userExist.bio,
            photo: userExist.photo,
            phone: userExist.phone,
            token,
        });
        } else {
          throw new Error("Invalid Email dan Password")
        }

  } catch (error) {
    next(error);
  }
}

export const logout = async ( req , res ) =>{
  res.cookie("token" , "",{
    path:"/",
    httpOnly : true,
    expires : new Date(0),
    sameSite : "none",
    secure : true ,
  }).json({message : " Logout Berhasil "})
}

export const getUser = async ( req , res )=>{

    const user = await prisma.user.findUnique({where : {
      id: req.user.id
    }})

    if(user){
      return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            photo: user.photo,
            phone: user.phone,
            
      })
    } else {
      throw new Error("User Tidak Ditemukan")
    }
}

export const loginStatus = async ( req , res )=>{

  const token = req.cookies.token

  if(!token){
    return res.json(false)
  }

  // jika ada token
  const verified = await jwt.verify(token,process.env.JWT_SECRET)

  if(verified){
    return res.json(true)
  }

  return res.json(false)

}



// export const Login = async (req, res) => {
//   try {
//     const user = await prisma.user.findMany({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const match = await bcrypt.compare(req.body.password, user[0].password);
//     if (!match) return res.status(400).json({ msg: "Password Salah" });
//     const userId = user[0].id;
//     const userName = user[0].username;
//     const email = user[0].email;
//     const accessToken = jwt.sign(
//       { userId, userName, email },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "20s",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { userId, userName, email },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//     });
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(404).json({ msg: "Email Tidak Ditemukan" });
//   }
// };


