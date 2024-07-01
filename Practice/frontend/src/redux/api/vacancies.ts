import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVacancy, IVacancyReqData } from "../../../Interfaces/interfaces";


export const vacanciesApi = createApi({
  reducerPath: 'api/vacancies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000'
  }),
  endpoints: (build ) => ({
    getAllVacancies: build.query<IVacancy[],any>({
      query:() => 'vacancies'
    }),
    getVacancies: build.mutation<IVacancy[], IVacancyReqData>({
      query: (data) => ({
        url: 'vacancies',
        method: 'POST',
        body: data
      }),
    }),
  })
})


export const { useGetAllVacanciesQuery } = vacanciesApi
export const { useGetVacanciesMutation } = vacanciesApi