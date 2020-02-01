const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => res.render('index', {
    name: 'aaa'
}));
app.get('/users', (req, res) => res.render('users/index', {
    users: [
        { name: 'binh' },
        { name: 'anh' }
    ]
}))

app.listen(port, () => console.log('Server listening on port 3000'))