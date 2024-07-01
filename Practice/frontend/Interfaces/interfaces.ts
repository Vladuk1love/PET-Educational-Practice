export interface IVacancy{
  _id: string,
  name: string,
  city: string,
  salary: string,
  requirement: string,
}

export interface IVacancyReqData{
  text: string,
  perPage: number,
  page: number
}