const express = require('express');
const { readFile } = require('fs');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    readFile('public/index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred')
        }
        res.send(data)
    })
})

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})