const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')

function initRoutes(app) {
    app.get('/', homeController().home)
    app.get('/index', homeController().home)
    app.get('/about', homeController().about)
    app.get('/contact', homeController().contact)
    app.get('/shop', homeController().shop)
    app.get('/shop-single', homeController().shopSingle)

    app.get('/login', authController().login)
    app.get('/signup', authController().signup)
    app.post('/login', authController().loginPost)
    app.post('/signup', authController().signupPost)
    app.get('/logout', authController().logout)

}

module.exports = initRoutes;