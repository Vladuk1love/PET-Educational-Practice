import React, { useState } from 'react';
import styles from './First.module.css'
import { useGetVacanciesMutation } from "../../redux/api/vacancies";
import Vacancy from "../Vacancy/Vacancy";
import { useFormik } from "formik";


function First() {
  const [ sendReq, {isLoading,error, data} ] = useGetVacanciesMutation()
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {filter: ''},
    onSubmit: async values => {
      await sendReq({
        text: values.filter,
        page: page,
        perPage: 10
      })
    }
  })
  if(error){console.log(error)}

  return (
    <div className={styles.first_container}>
      <p>Парсинг с hh.ru</p>
      <form onSubmit={formik.handleSubmit}>
        <input
          id = "filter"
          type="text"
          placeholder={"Поиск на hh.ru"}
          value={formik.values.filter}
          onChange={formik.handleChange}
        />
        <button type="submit">Поиск</button>
      </form>

      {isLoading ? <p>Loading...</p> :
        <div>
          {data && data.map((item, index) =>
            <Vacancy {...item}/>
          )
          }
          {/*{data &&*/}
          {/*  <nav className={styles.first_navigation}>*/}
          {/*    <p>← предыдущая страница</p>*/}
          {/*    <p>следующая страница →</p>*/}
          {/*  </nav>*/}
          {/*}*/}
        </div>
      }

    </div>
  );
}

export default First;