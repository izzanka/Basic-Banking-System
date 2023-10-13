const express = require('express')
const UserController = require('./controller/UserController')
const AccountController = require('./controller/AccountController')
const TransactionController = require('./controller/TransactionController')
const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getAllUsers)
router.get('/users/:userId', UserController.getUserById)

router.post('/accounts', AccountController.createAccount)
router.get('/accounts', AccountController.getAllAccounts)
router.get('/accounts/:accountId', AccountController.getAccountById)

router.post('/transactions', TransactionController.createTransaction)
router.get('/transactions', TransactionController.getAllTransactions)
router.get('/transactions/:transactionId', TransactionController.getTransactionById)

module.exports = router