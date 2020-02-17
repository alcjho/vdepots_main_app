import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import i18n from "i18n-2";
import session from "express-session";
import es6Renderer from 'express-es6-template-engine';
import path from 'path';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * configure languages middleware for french and english using cookie
 * 
 */
i18n.expressBind(app, {
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  cookieName:'mylang',
  extension: '.json'
});

/**
* Initializing Language module (i18n use the cookie set by the client to intitialize the language)
* without cookie, the default language will prevail.
*/
app.use(function(req, res, next){
  req.i18n.setLocaleFromCookie();
  next();
})


/**
 * Parse ajax request
 */
app.use(bodyParser.json());

/**
 * Parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Session middleware
 * var expiryDate = new Date(Date.now() + 60 * 60 * 1000); //1hour
 */
app.use(session({
    secret: '_abcd1234',
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge: 3456000 //60 minutes
    }
}))


/**
* External Directory specification for medias
* 
*/
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');


import setRoutes from "./routes/index.js";
setRoutes(app);

// app.get('/', function(req, res) {
//   res.render('home/index', {locals: {title: 'Welcome!'}});
// });

app.listen(3000);app