const express = require('express');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

let users = [
    { id: 1, name: 'binh' },
    { id: 2, name: 'anh' },
    { id: 3, name: 'anh2' },
]

app.get('/', (req, res) => res.render('index', {
    name: 'aaa'
}));
app.get('/users', (req, res) => res.render('users/index', { users }));
app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', { users: matchedUsers });
});

app.get('/users/create', (req, res) => res.render('users/create'));
app.post('/users/create', (req, res) => {
    let user = req.body;
    users.push(user);
    res.redirect('/users');
});

app.listen(port, () => console.log('Server listening on port 3000'))