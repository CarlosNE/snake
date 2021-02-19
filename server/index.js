const express = require('express')
const port = 3000
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const app = express()
app.set('views', path.join(__dirname, 'public'))
app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(publicPath));

app.listen(3000, () => { console.log(__dirname) })