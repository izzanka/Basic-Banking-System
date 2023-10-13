const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    createAccount: async (req, res) => {

        try {

            const {user_id, bank_name, bank_account_number, balance} = req.body

            if(!user_id || !bank_name || !bank_account_number || !balance){
                return res.status(400).json({
                    message: 'all fields is required'
                })
            }

            const userId = parseInt(user_id)

            const user = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })

            if(!user){
                return res.status(500).json({
                    message: `user with id ${userId} not found`
                })
            }

            await prisma.bank_accounts.create({
                data:{
                   user_id: userId,
                    bank_name: bank_name,
                    bank_account_number: bank_account_number,
                    balance: BigInt(parseInt(balance)),
                } 
            })

            return res.status(200).json({
                message: `create bank account for user id ${userId} success`,
            })

        } catch (error) {
            return res.status(500).json({
                message: 'create bank account failed'
            })
        }
    },

    getAllAccounts: async (req, res) => {
        try {
            
            const accounts = await prisma.bank_accounts.findMany()

            const bank_accounts = accounts.map((account) => {
                return {
                  ...account,
                  balance: parseInt(account.balance),
                };
            });
          
            return res.status(200).json({
                message: 'get all bank accounts success',
                data: bank_accounts
            })

        } catch (error) {
            return res.status(500).json({
                message: 'get all bank accounts failed'
            })
        }
    },

    getAccountById: async (req, res) => {
        try {

            const accountId = parseInt(req.params.accountId)

            const account = await prisma.bank_accounts.findUnique({
                where: {
                    id: accountId,
                },
                include: {
                    user: {
                        include: {
                            profile: true
                        }
                    }
                },
            })

            if(!account) {
                return res.status(404).json({
                    message: `bank account with id ${accountId} not found`
                })
            }

            account.balance = parseInt(account.balance)

            return res.status(200).json({
                message: 'get bank account by id success',
                data: account
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'get bank account by id failed'
            })
        }
    }

}