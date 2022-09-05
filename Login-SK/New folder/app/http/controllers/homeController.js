function homeController() {
    return {
        async home(req, res) {
            if (req.session) {
                var user = req.session.user;
                console.log(user);
                return res.render('home', { user })
            } else {
                console.log('user not found');
                return res.render('home')
            }
        },
        async about(req, res) {
            return res.render('admin/about')
        },
        async contact(req, res) {
            return res.render('customers/contact')
        },
        async shop(req, res) {
            return res.render('customers/shop')
        },
        async shopSingle(req, res) {
            return res.render('customers/shop-single')
        }
    }
}

module.exports = homeController;