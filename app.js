const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoSession({
  uri: 'mongodb+srv://ankur54:S9%25%23H5Cn4G4Z92z@cluster0.lyjzo91.mongodb.net/shop-demo?retryWrites=true',
  collection: 'shop-sessions',
  expiresAfterSeconds: 60 * 60
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ankur session',
  resave: false,
  saveUninitialized: false,
  store
}))

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://ankur54:S9%25%23H5Cn4G4Z92z@cluster0.lyjzo91.mongodb.net/shop-demo?retryWrites=true'
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
