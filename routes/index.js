const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model")

/* GET home page */
router.get('/', (req, res, next) => res.render('index', {css:['main.css', 'home.css']}));

router.get('/movies', (req,res) => {
    console.log(req.query)

    Movie.find(req.query)
    .then((moviesDocuments) => {
        res.render('movies.hbs', {
            css:['style.css'],
            movies: moviesDocuments,
        });
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/movies/:id', (req,res) => {
    const isValid = mongoose.isValidObjectId(req.params.id);

    if(isValid) {
        Movie.findById(req.params.id)
        .then((movieDocument) => {
            console.log.log(movieDocument);
            res.render("oneMovie.hbs", {
                movie: movieDocument
            });
        })
        .catch((error) => {
            console.log(error)
        })
    } else {
        res.render("not-found.hbs")
    }
})

module.exports = router;
