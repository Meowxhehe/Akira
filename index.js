import session from 'express-session'
import express from 'express'
import formidable from 'formidable'

import auth from './auth.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('resources'))
app.use(session({ secret: 'cloud', resave: false, saveUninitialized: false }))
app.use(auth)

app.get('/', (req, res) => res.render('index'))

app.post('/upload', async (req, res) => {
  await formidable({
    maxTotalFileSize: Infinity,
    maxFileSize: Infinity,
    uploadDir: './files',
    filename: (_, __, file) => file.originalFilename
  }).parse(req)

  res.send('[Akīra] File received!')
})

app.listen(80)