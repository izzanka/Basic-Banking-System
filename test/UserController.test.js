const userController = require('../controller/UserController')
const app = require('../index')

const request = require('supertest')

const mockRequest = (body = {}) => ({body})
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

test('test loginUser function success', async() => {

    const mockRequestLoginUser = (body = {
        email: 'izzan2@gmail.com',
        password: 'password'
    }) => ({body})

    const req = mockRequestLoginUser()
    const res = mockResponse()

    await userController.loginUser(req, res)
    
    expect(res.status).toBeCalledWith(200)
})

// test('test registerUser function success', async() => {

//     const mockRequestRegister = (body = {
//         name: "izzanka123",
//         email: "izzanka123@gmail.com",
//         password: "password",
//         identity_type: "daw2424",
//         identity_number: "dawdwad",
//         address: "jalanan"
//     }) => ({body})

//     const req = mockRequestRegister()
//     const res = mockResponse()

//     await userController.registerUser(req, res)
    
//     expect(res.status).toBeCalledWith(200)
//     expect(res.json).toBeCalledWith({
//         message: 'create user with profile success'
//     })
// })

test('test getAllUsers function success', async() => {

    const req = mockRequest()
    const res = mockResponse()

    await userController.getAllUsers(req, res)
    
    expect(res.status).toBeCalledWith(200)
})

test('test getUserById function success', async() => {

    const mockRequestGetUserById = (params = {
        userId: 2
    }) => ({params})

    const req = mockRequestGetUserById();
    const res = mockResponse()

    await userController.getUserById(req, res)
    
    expect(res.status).toBeCalledWith(200)
})

// test('test POST /api/v1/auth/register', async() => {
//     const response = await request(app).post('/api/v1/auth/register')
//         .send({
//             name: "izzanka321",
//             email: "izzanka321@gmail.com",
//             password: "password",
//             identity_type: "daw2424",
//             identity_number: "dawdwad",
//             address: "jalanan"
//         })

//     expect(response.statusCode).toBe(200)
//     expect(response.body).toHaveProperty('message')
//     expect(response.body.message).toEqual('create user with profile success')
// })

test('test POST /api/v1/auth/login', async() => {
    const response = await request(app).post('/api/v1/auth/login')
        .send({
            email: "izzan4@gmail.com",
            password: "password"
        })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('token')
    expect(response.body.message).toEqual('login success')
})

test('test GET /api/v1/users', async() => {
    const response = await request(app).get('/api/v1/users')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.message).toEqual('get all users success')  
})

test('test GET /api/v1/users/{userId}', async() => {
    const response = await request(app).get('/api/v1/users/3')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.message).toEqual('get user by id success')  
})