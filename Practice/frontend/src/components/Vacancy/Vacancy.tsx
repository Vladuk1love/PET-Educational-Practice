import React from 'react';
import styles from './Vacancy.module.css'
import { IVacancy } from "../../../Interfaces/interfaces";


function Vacancy(props: IVacancy) {
  return (
    <a href={`https://hh.ru/vacancy/${props._id}`} target={'_blank'} rel="noreferrer" className={styles.vacancy_link}>
      <div className={styles.vacancy_container}>
        <div className={styles.vacancy_header}>
          <p>{props.name}</p>
          <p>{props.city}</p>
        </div>
        <p style={{paddingBottom: "7px"}}>Зарплата: {props.salary}{props.salary !== 'Не указано' && "₽"}</p>
        <p style={{fontWeight: "300"}}>{props.requirement}</p>
      </div>
    </a>
  );
}

export default Vacancy;