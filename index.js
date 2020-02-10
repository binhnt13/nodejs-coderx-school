const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('awdawrwreeref'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index', {
    name: 'aaa'
}));

app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log('Server listening on port ' + port))