const db = require('../db');
const users = db.get('users').value();
const shortid = require('shortid');

module.exports.index = (req, res) => res.render('users/index', { users } );
module.exports.search = (req, res) => {
    const q = req.query.q;
    const matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', { users: matchedUsers });
};
module.exports.create = (req, res) => res.render('users/create');
module.exports.userId = (req, res) => {
    const id = req.params.id;
    const user = db.get('users').find({ id }).value()
    res.render('users/view', { user });
};
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/');
};
    