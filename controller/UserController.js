const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const saltRounds = 8

module.exports = {

    createUser: async (req, res) => {
        try {

            const {name, email, password, identity_type, identity_number, address} = req.body

            if(!name || !email || !password || !identity_type || !identity_number|| !address){
                return res.status(400).json({
                    message: 'all fields is required'
                })
            }

            const bcryptPassword = await bcrypt.hash(password, saltRounds)

            await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: bcryptPassword,
                    profile: {
                        create: {
                            identity_number: identity_number,
                            identity_type: identity_type,
                            address: address,
                        }
                    }
                }
            })
    
            return res.status(200).json({
                message: 'create user with profile success'
            })

        } catch (error) {
            return res.status(500).json({
                message: 'create user with profile failed'
            })
        }  
    },

    registerUser: async (req, res) => {

        try {

            // const {name, email, password, identity_type, identity_number, address} = req.body

            // if(!name || !email || !password || !identity_type || !identity_number|| !address){
            //     return res.status(400).json({
            //         message: 'all fields is required'
            //     })
            // }

            const bcryptPassword = await bcrypt.hash(password, saltRounds)

            await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: bcryptPassword,
                    profile: {
                        create: {
                            identity_number: identity_number,
                            identity_type: identity_type,
                            address: address,
                        }
                    }
                }
            })
    
            return res.status(200).json({
                message: 'create user with profile success'
            })

        } catch (error) {
            return res.status(500).json({
                message: 'create user with profile failed'
            })
        }  
    },

    loginUser: async (req, res) => {
        try {

            // const {email, password} = req.body

            // if(!email || !password){
            //     return res.status(400).json({
            //         message: 'email and password is required'
            //     })
            // }

            const user = await prisma.users.findFirst({
                where: {
                    email: req.body.email
                }
            })

            if(!user) {
                return res.status(404).json({
                    message: `user not exist`
                })
            }

            if(bcrypt.compareSync(req.body.password, user.password))
            {
                const token = jwt.sign({id: user.id}, 'secret_key', {expiresIn: '6h'})

                return res.status(200).json({
                    message: 'login success',
                    data: {
                        token: token
                    }
                })
            }

            return res.status(403).json({
                message: "email or password is wrong"
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'login failed'
            })
        }
    },

    getAllUsers: async (req, res) => {

        try {
            
            const users = await prisma.users.findMany()

            return res.status(200).json({
                message: 'get all users success',
                data: users
            })

        } catch (error) {
            return res.status(500).json({
                message: 'get all users failed'
            })
        }
    },

    getUserById: async (req, res) => {

        try {

            const userId = parseInt(req.params.userId)

            const user = await prisma.users.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    profile: true,
                },
            })

            if(!user) {
                return res.status(404).json({
                    message: `user with id ${userId} not found`
                })
            }

            return res.status(200).json({
                message: 'get user by id success',
                data: user
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'get user by id failed'
            })
        }
    },

    getUser: async(req, res) => {
        try {
            
            const user = await prisma.users.findUnique({
                where:{
                    id: res.user.id
                }
            })

            return res.status(200).json({
                message: 'get logged user success',
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                message: 'get logged user failed'
            })
        }
    }

}