const md5 = require('md5');
const db = require('../db');

module.exports.index = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = db.get('users').find({ email }).value();
    if(!user) {
        res.render('auth/login', {
            errors: ['User is not exist']
        });
        return;
    };
    const hashedPassword = md5(password);
    if(user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: ['Password is wrong!']
        });
        return;
    };
    res.cookie('userId', user.id, { signed: true })
    res.redirect('/users')
};