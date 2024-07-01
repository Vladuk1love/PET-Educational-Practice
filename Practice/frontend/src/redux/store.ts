import { configureStore } from "@reduxjs/toolkit";
import { vacanciesApi } from "./api/vacancies";


export const store = configureStore({
  reducer:{
    [vacanciesApi.reducerPath]: vacanciesApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(vacanciesApi.middleware)
})


export type RootState =ReturnType<typeof store.getState>