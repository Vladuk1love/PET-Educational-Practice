import mongoose from "mongoose";

const VacanciesSchema = mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  requirement: {
    type: String
  },
  experience: {
    type: String,
    required: true
  }
})

export default mongoose.model('vacancies', VacanciesSchema)