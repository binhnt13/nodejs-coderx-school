const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', {
    name: 'aaa'
}));

app.use('/users', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port))