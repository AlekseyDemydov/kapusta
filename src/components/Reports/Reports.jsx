import Container from 'components/Container/Container';
import React from 'react';
import { useState, useEffect } from 'react';
import { getPeriodTransactions } from '../../utils/api';
import ReportsHeader from '../ReportsHeader/ReportsHeader';
import ReportsCategories from '../ReportsCategories/ReportsCategories';

// import s from './Reports.module.scss';

export default function Reports() {
  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState({});
  // const []

  useEffect(() => {
    getPeriodTransactions('2022-07')
      .then(res => {
        setIncomes(res.data.incomes);
        setExpenses(res.data.expenses);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      {console.log(incomes)}
      <div style={{ backgroundColor: '#eee' }}>
        <Container>
          <ReportsHeader incomes={incomes} expenses={expenses} />
          <ReportsCategories incomes={incomes} expenses={expenses} />
        </Container>
      </div>
    </>
  );
}
