import express from 'express'
import cors from 'cors'
import searchVacancies from './utils/search.js'
import mongoose from "mongoose";
import { config } from "./config.js";
import Vacancies from "./schemas/Vacancies.js";


const app = express()
app.use(express.json())
app.use(cors())


// Подключение к MongoDb
mongoose.connect(config.MONGO_URL
).then(() => console.log('DataBase started successfully'))
  .catch((error) => console.log('DataBase error:', error))


app.get('/vacancies', async (req, res) => {
  try {
    // populate - подключить связь схемы поста со схемой юзера
    const posts = await Vacancies.find().limit(50).exec();

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error while searching for vacancies'
    })
  }
})

app.post('/vacancies', (req, res) => {
  searchVacancies(
    req.body.text,
    +req.body.perPage, // + Приводит к типу number
    +req.body.page,

  ).then((vacancies) => {
    res.json(vacancies)
  }).catch(error => {
    console.log(error)
    res.status(500).json({
      message: 'Could not find vacancies'
    })
  })
})


app.listen(5000, (error) => {
  if (error) {
    return console.log('Server Error: ', error)
  } else {
    return console.log('Server is successfully started')
  }
})