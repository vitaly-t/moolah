const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const compress = require('compression');
const throng = require('throng');

// Heroku sets NODE_ENV to production by default. So if we're not
// on Heroku, we assume that we're developing locally.
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_DIR = __dirname;
const PROJECT_ROOT = path.normalize(BASE_DIR + '/..');
const ASSETS_PATH = path.join(PROJECT_ROOT, 'client-dist');
const VIEWS_DIR = path.join(BASE_DIR, 'views');

const WORKERS = process.env.WEB_CONCURRENCY || 1;

function start() {
  const app = express();

  app.set('env', NODE_ENV);

  app.use(compress());
  app.use(express.static(ASSETS_PATH));

  // Configure the templating engine
  const hbsOptions = {
    extname: '.hbs',
    layoutsDir: VIEWS_DIR + '/layouts',
    partialsDir: VIEWS_DIR + '/partials',
    defaultLayout: 'main'
  };
  app.set('view engine', '.hbs');
  app.set('views', VIEWS_DIR);
  app.engine('.hbs', exphbs(hbsOptions));

  const port = process.env.PORT || 5000;
  app.set('port', port);

  // Every route is served by our JS app
  app.get('*', function(req, res) {
    res.locals.devMode = res.app.get('env') === 'development';
    return res.render('index');
  });

  app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
  });
}

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});
