import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import i18n from "i18n-2";
import session from "express-session";
import ejsLayout from 'express-ejs-layouts';
import ejs from 'ejs';
import path from 'path';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);


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
* External Directory specification for medias
* 
*/
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 
 * configuration required for for ejs template engine
 */
app.use(ejsLayout);
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('layout', 'layouts/main');  


/**
* Initializing Language module (i18n use the cookie set by the client to intitialize the language)
* without cookie, the default language will prevail.
*/
app.use(function(req, res, next){
  req.i18n.setLocaleFromCookie();
  next();
})


import home from "./routes/home/index.js";
home(app);

import user from "./routes/user/index.js";
user(app);

app.listen(3000);