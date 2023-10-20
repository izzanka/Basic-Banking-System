const express = require('express')
const UserController = require('./controller/UserController')
const AccountController = require('./controller/AccountController')
const TransactionController = require('./controller/TransactionController')
const checkToken = require('./middleware/checkToken')
const schema = require('./validator/UserValidator')
const validate = require('./middleware/validate')
const router = express.Router()

router.post('/auth/register', validate(schema.registerValidator), UserController.registerUser)
router.post('/auth/login', validate(schema.loginValidator), UserController.loginUser)
router.get('/auth/authenticate', checkToken, UserController.getUser)

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