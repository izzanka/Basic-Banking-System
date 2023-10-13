const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

module.exports = {

    createUser: async (req, res) => {

        const saltRounds = 8

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
    }

}