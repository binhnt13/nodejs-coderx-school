const express = require('express');
const db = require('../db');
const shortid = require('shortid');

const router = express.Router();

let users = db.get('users').value();
router.get('/', (req, res) => res.render('users/index', { users } ));
router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', { users: matchedUsers });
});

router.get('/create', (req, res) => res.render('users/create'));

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = db.get('users').find({ id }).value()
    res.render('users/view', { user });
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/');
});

module.exports = router;