const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

// Load Routes
const auth = require('./routes/auth')
const index = require('./routes/index')
const stories = require('./routes/stories')

//Load Models
require('./models/User')

require('./models/Story')

// Passport Config
require('./config/passport')(passport)

// Load Keys
const keys = require('./config/keys')
const port = process.env.PORT || 5000

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Map global promises
mongoose.Promise = global.Promise;


// Mongoose Connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => console.log("Mongo Db connected")).catch(err => console.log(err))


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


// Cookie Parser
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null
    next();
})

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

app.post