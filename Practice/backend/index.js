import express from 'express'
import cors from 'cors'
import searchVacancies from './utils/search.js'
import mongoose from "mongoose";
import { config } from "./config.js";
import Vacancies from "./schemas/Vacancies.js";
import axios from "axios";
import { config } from "../config.js";
import Vacancies from '../schemas/Vacancies.js'

function salary(prop) {
  if (prop.salary) {
    if (prop.salary.from && prop.salary.to) {
      return `${prop.salary?.from}-${prop.salary?.to}`
    }
    if (prop.salary.from && !prop.salary.to) {
      return `${prop.salary?.from}`
    } else {
      return `${prop.salary?.to}`
    }
  } else {
    return 'Не указано'
  }
}

const searchVacancies = async (text, perPage, page) => {
  try {
    const response = await axios.get(
        `${config.BASE_URL}/vacancies?text=${text}&per_page=${perPage}&page=${page}`
    )
    // Записываем вакансии в БД
    response.data.items.map(async (item) => {
      try {
        const doc = new Vacancies({
          _id: item.id,
          name: item.name,
          city: item.area.name,
          salary: salary(item), // f-строка
          requirement: item.snippet.requirement,
          experience: item.experience.name
        })
        const vacancy = await doc.save() //.then(() => console.log('Вакансия Добавлена'+ item.name))
      }catch (err){
        // Единственная ошибка, которая появляется на этом моменте - из-за уже существующей вакансии с таким id
        // Поэтому мы пробуем(на всякий случай, может всё таки поймаем другую ошибку) найти запись с таким id
        // и обновляем её данные.
        // Так, мы обходим проблему уникальности, при этом отлавливаем ошибки на всех этапах
        await Vacancies.findOneAndUpdate({
              _id: item.id
            }, {
              name: item.name,
              city: item.area.name,
              salary: salary(item), // f-строка
              requirement: item.snippet.requirement,
              experience: item.experience.name
            },
            {
              returnDocument: 'after'
            }).catch((err) => {
          // Если ошибка не в уникальности, то findOneAndUpdate не сломает приложение,
          // а скажет нам, что ничего не нашёл.
          console.log(err)
        })
      }
    });

    return response.data.items.map((item) => {
      return {
        _id: item.id,
        name: item.name,
        city: item.area.name,
        salary: salary(item), // f-строка
        requirement: item.snippet.requirement,
        experience: item.experience.name
      }
    });

  } catch (error) {
    console.log(error)
  }
}

export default searchVacancies

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