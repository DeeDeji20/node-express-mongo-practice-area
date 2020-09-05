// const http = require("http");
// const fs = require("fs");
// const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();


//connect to mongoDB
const dbURI = 'mongodb+srv://deedeji:deesnow200@cluster0.taz0m.mongodb.net/node-tus?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000, () => {
            console.log("Running")
        });
        console.log('connected to the db')
    })
    .catch((err) => { console.log(err) })

//register view engine
app.set('view engine', 'ejs');


//middlewares
// app.use((req, res, next) => {
//     console.log('new request is being made');
//     console.log(`host: ${req.hostname}`);
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     console.log('the next middleware')
//     next();
// })

//middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index', { 'title': 'Home' });
});

app.get('/about', (req, res) => {

    res.render('about', { 'title': 'About' });
});

app.get('/blogs', (req, res) => {
    const blogs = [
        { 'title': 'Love story', 'snippet': 'Dees love song' },
        { 'title': 'Happy endings', 'snippet': 'Thank you' }
    ];
    res.render('blogs', { 'title': 'Blogs', blogs });
})

// app.get('/add-blog', (req, res) => {
//         const blog = new Blog({
//             title: 'my new blog',
//             snippet: 'Something lorem ipsum',
//             body: 'more about the new blog created'
//         });
//         blog.save()
//             .then((result) => {
//                 res.send(result);
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     })
// app.get('/blogs', (req, res) => {
//         Blog.find()
//             .then((resut) => {
//                 res.render('blogs', {
//                     title: 'All Blogs',
//                     blogs: result
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     })
//*app.get('/about us', (req, res) => {
// res.send("<p>Dee</p>")
//res.redirect('/about', { root: __dirname });

//})

//middleware
app.use('/', (req, res) => {
    res.status(404).render('404', { 'title': '404' })
});

// app.listen(3000, () => {
//     console.log("Running")
// });