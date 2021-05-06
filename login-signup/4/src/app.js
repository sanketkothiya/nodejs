require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('./db/conn');
const Collection = require('./models/collection');
const auth = require('./middleware/auth');
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', templatePath)
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/secret', auth, (req, res) => {
    res.render('secret');
});

app.get('/logout', auth, async(req, res) => {
    try {
        res.clearCookie('jwt');
        // console.log(req.user);

        // Logout from one device
        // req.user.tokens = req.user.tokens.filter((currentElement) => {
        //     return currentElement.token !== req.token
        // })

        // Logout from all devices
        req.user.tokens = [];

        console.log('logout successful');

        await req.user.save();
        res.render('login');

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// app.get('/collection', (req, res) => {
//     res.render('collection');
// });

app.post('/collection', async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            const registerEmployee = new Collection({
                first_name: req.body.fname,
                last_name: req.body.lname,
                email_id: req.body.email,
                phone_number: req.body.phnumber,
                age: req.body.age,
                password: password
            });

            const token = await registerEmployee.generateAuthToken();

            // // Set Cookies for signup
            // res.cookie('signup', token, {
            //     expires: new Date(Date.now() + 60000),
            //     httpOnly: true
            // });
            // console.log(cookie);

            const registered = await registerEmployee.save();
            if (registered) {
                res.status(200)
                    .cookie('jwt', token, {
                        // expires: new Date(Date.now() + (24 * 60 * 60 * 1 * 1000)),
                        expires: new Date(Date.now() + (30 * 1000)),
                        httpOnly: true
                    })
                    .render('index', {
                        msg: 'Your Registration Successful. you can now login.'
                    })
                console.log('Employee Registration Successful!');
            } else {
                console.log('Employee Registration has failed!');
            }
        } else {
            res.send('Password not matched.');
        }
    } catch (err) {
        res.status(401).send(err);
    }
});

app.post('/login', async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userLogin = await Collection.findOne({ email_id: email });
        if (userLogin) {
            // console.log(userLogin);

            const loginToken = await userLogin.generateAuthToken();

            // Set Cookies for login
            // res.cookie('login', loginToken, {
            //     expires: new Date(Date.now() + 120000),
            //     httpOnly: true
            // });
            // console.log(cookie);

            const userHashPassword = await bcrypt.compare(password, userLogin.password);

            if (userHashPassword) {
                res.status(200)
                    .cookie('jwt', loginToken, {
                        // expires: new Date(Date.now() + (24 * 60 * 60 * 1 * 1000)),
                        expires: new Date(Date.now() + (30 * 1000)),
                        httpOnly: true
                    })
                    .render('index', {
                        username: userLogin.first_name,
                        loginMsg: 'to portal '
                    });
                console.log('Employee Successfully login!');
            } else {
                res.status(200).send('Invalid Login Details');
                console.log('Employee not Successfully login!');
            }
        } else {
            res.status(200).send('User Not Found');
        }

    } catch (error) {
        res.status(400).send('Page Not Found');
    }
});

app.get('*', (req, res) => {
    res.status(404).send("Page Not Found!");
});

app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
})