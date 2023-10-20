const userController = require('../controller/UserController')
const mockRequest = (body = {}) => ({body})
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

test('test loginUser function success', async() => {

    const mockRequestLogin = (body = {
        email: 'izzan2@gmail.com',
        password: 'password'
    }) => ({body})

    const req = mockRequestLogin()
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

