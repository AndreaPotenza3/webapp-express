const connection = require('../data/db.js')


function index(_, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, movies) => {

        if (err) return res.status(500).json({ message: err.message })

        movies.forEach((movie) => {
            movie.image = `http://localhost:3000/${movie.image}`
        })

        res.json(movies)
    })
}

function show(req, res) {

    const id = parseInt(req.params.id)

    const sql = `SELECT * FROM movies WHERE id = ?`

    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0) return res.status(404).json({
            error: 'Not found',
            message: 'Movie not Found'
        })
        const movie = results[0]
        movie.image = `http://localhost:3000/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE movie_id =?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results


            res.json(movie)
        })

    })

}

function storeReview(req, res) {
    const id = req.params.id

    const { name, vote, text } = req.body

    const sql = 'INSERT INTO reviews(name,vote,text,movie_id) VALUES (?,?,?,?)'

    connection.query(sql, [name, vote, text, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' })
        res.status(201).json({ message: 'review added', id: results.insertId })
    })
}

module.exports = { index, show, storeReview }