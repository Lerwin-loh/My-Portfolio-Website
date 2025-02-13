const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// -----------------------------------------------------  Google Firebase  -----------------------------------------------------
const admin = require('firebase-admin'); 
// Read the service account JSON (as a string) from an environment variable
const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!serviceAccountJSON) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable');
}

// Convert the JSON string to an object
const serviceAccount = JSON.parse(serviceAccountJSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // storageBucket: 'gs://my-portfolio-dde4a.firebasestorage.app'
});


/*
  Load files in routes folder. The main.js determines which function will be called based on the HTTP request and URL.
 */
const mainRoute = require('./routes/main');



// Body parser middleware: to parse HTTP body in order to read HTTP data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// To use static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, '/public')));


// Handlebars Middleware
/*
    1. Handlebars is a front-end web templating engine that helps to create dynamic web pages using variables
    from Node JS.
    2. Node JS will look at Handlebars files under the views folder
*/
app.engine('handlebars', exphbs.engine({
    helpers: {},

    defaultLayout: 'main' // specifies the main.handlebars file under views/layouts as the default template
}));
app.set('view engine', 'handlebars');

Handlebars.registerHelper('ifIn', function(value, array, options) {
    if (Array.isArray(array) && array.indexOf(value.toUpperCase()) !== -1) {
      // Condition is met, so render the main block
      return options.fn(this);
    } else {
      // Condition is NOT met, so render the "else" block
      return options.inverse(this);
    }
  });
  


/*
 Defines that any root URL with '/' that Node JS receives request from, for eg. http://localhost:3000/, will be handled by
 mainRoute which was defined to point to routes/main.js
*/
app.use('/', mainRoute); 



//The ALL ERRORS Route, eg: 404 error (ALWAYS Keep this below the routing)
app.get('*', function(req, res) {
    res.render('ErrorPage/allError');
});



// Starts the server and listen to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` + `, http://localhost:${PORT}/`)
})
