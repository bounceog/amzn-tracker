require('dotenv').config()

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const ejsLayouts = require('express-ejs-layouts');

const routes = require('./routes/routes');
const { notFound, errorRoute } = require('./middleware/error');
const { rateLimiter } = require('./middleware/limit');

const app = express();
const PORT = process.env.PORT || 1312;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
        defaultSrc: [`'self'`, `cdn.jsdelivr.net`, `code.jquery.com`, `unpkg.com`],
      }
  }
}));
app.use(compression());

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use('/static', express.static('static'));

app.use('/', rateLimiter, routes); 
app.use(notFound);
app.use(errorRoute);

app.listen(PORT, () => {});