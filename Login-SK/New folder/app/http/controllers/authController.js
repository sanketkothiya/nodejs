const User = require('../../models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')


function authController() {
    return {
        async login(req, res) {
            return res.render('auth/login')
        },
        async signup(req, res) {
            return res.render('auth/signup')
        },


        async signupPost(req, res) {
            const { fname, lname, email, phone, password } = req.body

            let productPictures = [];

            if (req.files.length > 0) {
                productPictures = req.files.map((file) => {
                    return { img: file.filename };
                });
            }

            //Validate request
            if (!fname || !lname || !email || !phone || !password) {
                req.flash('error', 'All fields are required')
                req.flash('fname', fname)
                req.flash('lname', lname)
                req.flash('email', email)
                req.flash('phone', phone)
                return res.redirect('/signup')
            }

            //Check if email exists
            User.exists({ email: email, role: 'customer' }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('fname', fname)
                    req.flash('lname', lname)
                    req.flash('phone', phone)
                    return res.redirect('/signup')
                }
            })

            //Hash Password
            const hashPassword = await bcrypt.hash(password, 10)

            //Create a new user
            const user = new User({
                first_name: fname,
                last_name: lname,
                email,
                phone,
                password: hashPassword,
                image: productPictures
            })

            user.save()
                .then((user) => {
                    // console.log(user);
                    return res.redirect('/login')
                })
                .catch((err) => {
                    req.flash('error', 'Something went wrong')
                    // console.log(err);
                    return res.redirect('/signup')
                })
        },

        async loginPost(req, res, next) {
            const { email, password } = req.body

            //Validate request
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }

            User.exists({ email: email }, (err, result) => {
                if (!result) {
                    req.flash('error', 'User not found')
                    return res.redirect('/login')
                }
            })

            const user = await User.findOne({ email: email })
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    req.session.user = user;
                    return res.redirect('/')
                } else {
                    req.flash('error', 'Username or password incorrect')
                    return res.redirect('/login')
                }
            } else {
                req.flash('error', 'User not found...')
                return res.redirect('/login')
            }
        },

        logout(req, res) {
            req.session.destroy((err) => {
                if (err) {
                    return console.log(err);
                }
                res.redirect('/');
            });
        }
    }
}

module.exports = authController