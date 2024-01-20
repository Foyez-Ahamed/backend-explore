require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


// middleware //
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send('Foyez twitter')
})

app.get('/login', (req, res) => {
    res.send('<h1>This is login page</h1>')
})

app.get('/api/usersData', (req, res) => {
    const users = [
        {
          "id": 1,
          "name": "John Doe",
          "age": 30,
          "city": "New York"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "age": 25,
          "city": "Los Angeles"
        },
        {
          "id": 3,
          "name": "Bob Johnson",
          "age": 35,
          "city": "Chicago"
        }
      ]
    
    res.send(users)  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})