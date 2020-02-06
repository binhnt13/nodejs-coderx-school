const express = require('express');
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
const adapter = new FileSync('db.json')
const db = low(adapter)

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();
let users = db.get('users').value();

app.get('/', (req, res) => res.render('index', {
    name: 'aaa'
}));
app.get('/users', (req, res) => res.render('users/index', { users } ));
app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', { users: matchedUsers });
});

app.get('/users/create', (req, res) => res.render('users/create'));

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.get('users').find({ id }).value()
    res.render('users/view', { user });
})

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => console.log('Server listening on port 3000'))