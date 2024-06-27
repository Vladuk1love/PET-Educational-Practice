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
      `${config.BASE_URL}/vacancies`,
      {
        params: {
          text: {text},
          per_page: {perPage},
          page: {page},
          area: 1 // MOSCOW
        }
      }
    )
    // Записываем вакансии в БД
    response.data.items.map(async (item) => {
      const doc = new Vacancies({
        _id: item.id,
        name: item.name,
        city: item.area.name,
        salary: salary(item), // f-строка
        requirement: item.snippet.requirement,
        experience: item.experience.name
      })
      const vacancy = await doc.save()
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
//
// const vacansies = searchVacansies().then((items) => {
//   console.log(items)
// })