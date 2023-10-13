const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    createTransaction: async (req, res) => {
        
        try {
            
            const {source_account_id, destination_account_id, amount} = req.body

            if(!source_account_id || !destination_account_id || !amount){
                return res.status(400).json({
                    message: 'all fields is required'
                })
            }

            const sourceAccountId = parseInt(source_account_id)
            const destinationAccountId = parseInt(destination_account_id)
            const amountInt = BigInt(parseInt(amount))

            if(sourceAccountId === destinationAccountId){
                return res.status(400).json({
                    message: 'source account id and destination account id must be different'
                })
            }

            const sourceAccount = await prisma.bank_accounts.findUnique({
                where: {
                    id: sourceAccountId
                }
            })

            if(!sourceAccount) {
                return res.status(404).json({
                    message: `source account with id ${sourceAccountId} not found`
                })
            }

            if(sourceAccount.balance < amountInt){
                return res.status(500).json({
                    message: 'source account balance is insufficient'
                })
            }

            const destinationAccount = await prisma.bank_accounts.findUnique({
                where: {
                    id: destinationAccountId
                }
            })

            if(!destinationAccount) {
                return res.status(404).json({
                    message: `destination account with id ${destinationAccountId} not found`
                })
            }

            await prisma.bank_account_transactions.create({
                data:{
                    source_account_id: sourceAccountId,
                    destination_account_id: destinationAccountId,
                    amount: amountInt
                } 
            })
            .then(() => {
                return prisma.bank_accounts.update({
                    where:{
                        id: destinationAccountId,
                    },
                    data:{
                        balance: {
                            increment: amountInt
                        }
                    }
                })
            })
            .then(() => {
                
                return prisma.bank_accounts.update({
                    where:{
                        id: sourceAccountId,
                    },
                    data:{
                        balance: {
                            decrement: amountInt
                        }
                    }
                })
            })
            .then(() => {
                return res.status(200).json({
                    message: `transaction from user id ${sourceAccountId} to user id ${destinationAccountId} with amount ${amountInt} success` 
                })
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'transaction failed'
            })
        }
    },

    getAllTransactions: async (req, res) => {

        try {
            
            const transactions = await prisma.bank_account_transactions.findMany()

            const bankAccountTransactions = transactions.map((transaction) => {
                return {
                  ...transaction,
                  amount: parseInt(transaction.amount),
                };
            });
          
            return res.status(200).json({
                message: 'get all transactions success',
                data: bankAccountTransactions
            })

        } catch (error) {
            return res.status(500).json({
                message: 'get all transactions failed'
            })
        }
    },

    getTransactionById: async (req,res) => {

        try {

            const transactionId = parseInt(req.params.transactionId)

            const transaction = await prisma.bank_account_transactions.findUnique({
                where:{
                    id: transactionId
                },
                include:{
                    source_account: true,
                    destination_account: true
                }
            })

            if(!transaction) {
                return res.status(404).json({
                    message: `transaction with id ${transactionId} not found`
                })
            }

            transaction.source_account.balance = parseInt(transaction.source_account.balance)
            transaction.destination_account.balance = parseInt(transaction.destination_account.balance)
            transaction.amount = parseInt(transaction.amount)

            return res.status(200).json({
                message: 'get transaction by id success',
                data: transaction
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'get transaction by id failed'
            })
        }
    }

}