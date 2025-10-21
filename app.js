// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define the port number where our server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data
app.use(express.urlencoded({ extended: true}));

// Create an array to store orders
const orders = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Add a route for the form submission
app.post('/submit-order', (req, res) => {
    // Create a JSON object to store the data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings,
        size: req.body.size
    };
     // Add the order to our orders array
    orders.push(order);
    console.log(orders);

    // Direct the user to the confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// Define a "contact-us" route
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Define a "admin" route
app.get('/admin', (req, res) => {
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
    res.send(orders);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}');
});