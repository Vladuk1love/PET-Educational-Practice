import React, { useState } from 'react';
import styles from './Second.module.css'
import { useGetAllVacanciesQuery } from "../../redux/api/vacancies";
import Vacancy from "../Vacancy/Vacancy";
import { IVacancy } from "../../../Interfaces/interfaces";


function Second() {
  const { data, isLoading, error } = useGetAllVacanciesQuery('')
  const [filteredVacancies, setFilteredVacancies] = useState<IVacancy[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isSortOpen, setIsSortOpen] = useState(false)

  if(error){
    console.log("GetAllVacancyError:",error)
  }

  function formSubmit(event:React.FormEvent){
    event.preventDefault();
    if (data){
       const filtredArr =  data.filter(
        (item) => {
          return item.name.includes(inputValue)
        }
      )
      setFilteredVacancies(filtredArr)
    }
  }

  function sortData(sort: string){ // ascending - по возрастанию, descending - по убыванию, notSpecified - не задана
    if (data){
      const sourceArray = filteredVacancies?.length === 0 ? [...data] : [...filteredVacancies]
       switch (sort){
         case 'ascending':
           return setFilteredVacancies(sourceArray.sort((a,b) => {
             if (a.salary < b.salary) {
               return -1;
             } else if (a.salary > b.salary) {
               return 1;
             }
             return 0;
           }))

         case "descending":
          return setFilteredVacancies(sourceArray.sort((a, b) => b.salary.localeCompare(a.salary)))
         case "notSpecified":
           setFilteredVacancies(data)
       }
    }
  }

  return (
    <>
      <p>Вывод из базы данных</p>
      <div className={styles.second_header_container}>
        <form className={styles.second_search_form} onSubmit={(event) => formSubmit(event)}>
        <input
          type="text"
          placeholder={'Поиск по базе'}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type={"submit"}>Найти</button>
      </form>
      <div className={styles.sort_container}>
        <button onClick={() => setIsSortOpen(!isSortOpen)}>Сортировать</button>
        {isSortOpen &&
          <ul>
            <button onClick={() => sortData('notSpecified')}>Не задана</button>
            <button onClick={() => sortData('ascending')}>По возрастанию з/п</button>
            <button onClick={() => sortData('descending')}>По убыванию з/п</button>
          </ul>
        }
      </div>
      </div>
      {isLoading ? <p>Loading...</p> :
        <div>
          {
            filteredVacancies?.length === 0 ?
            (data && data.map((item, index) =>
            <Vacancy {...item} key = {index}/>)
          ):
            (filteredVacancies && filteredVacancies.map((item, index) =>
            <Vacancy {...item} key = {index}/>)
          )
          }
        </div>
      }
    </>
  );
}

export default Second;