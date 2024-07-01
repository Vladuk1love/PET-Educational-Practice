import React, { useState } from 'react';
import styles from './App.module.css'
import First from "../First/First";
import Second from "../Second/Second";


function App() {
  const [page, setPage] = useState(false)

  return (
    <div className={styles.app_container}>
      <header>
        <p>Юртаев Владислав БПИ-2301</p>
        <div className={styles.app_buttons}>
          <button disabled={!page} onClick={() => setPage(false)} className={styles.app_button}>Поиск по вакансиям</button>
          <button disabled={page} onClick={() => setPage(true)} className={styles.app_button}>Получить все вакансии</button>
        </div>
      </header>
      <main>
        {!page && <First/>}
        {page && <Second/>}
      </main>
    </div>
  );
}

export default App;
