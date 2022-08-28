import { useEffect,useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  expenseCategoriesThunk,
  getExpenseThunk,
  getIncomeThunk,
  incomeCategoriesThunk,
} from 'redux/transactions/transactionsOperations';
import { getAuthEmail } from 'redux/auth/AuthSelectors';
import {
  getTransactionsExpenseCategories,
  getTransactionsExpenses,
  getTransactionsIncomeCategories,
  getTransactionsIncomes,
  getTransactionsIsLoading,
} from 'redux/transactions/transactionsSelector';
import Balance from 'components/Balance/Balance';
import MyDate from 'components/MyDate/MyDate';
import IncomeForm from 'components/IncomeForm/IncomeForm';
import TransactionsMobBtn from '../../components/TransactionsMobBtn/TransactionsMobBtn';
import s from './TransactionsPage.module.scss';
import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import GooBack from 'components/GooBack/GooBack';


const TransactionsPage = () => {

  const [currentDate, setcurrentDate] =useState(new Date())


  const mob = useMediaQuery({ query: '(max-width: 767.5px)' });
  const desk = useMediaQuery({ query: '(min-width: 1279.5px)' });
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { transType } = useParams();
  const pageIncome = transType === 'income';
  const pageExpenses = transType === 'expenses';

  const email = useSelector(getAuthEmail);
  const incomesData = useSelector(getTransactionsIncomes);
  const expensesData = useSelector(getTransactionsExpenses);
  const isLoading = useSelector(getTransactionsIsLoading);
  const incomesCategories = useSelector(getTransactionsIncomeCategories);
  const expensesCategories = useSelector(getTransactionsExpenseCategories);

  useEffect(() => {
    if (email) {
      if (!mob & pageIncome) {
        !incomesData && dispatch(getIncomeThunk());
        !incomesCategories && dispatch(incomeCategoriesThunk());
        return;
      }
      if (!mob & pageExpenses) {
        !expensesData && dispatch(getExpenseThunk());
        !expensesCategories && dispatch(expenseCategoriesThunk());
        return;
      }
      if (!mob && (!pageExpenses || !pageExpenses)) {
        navigate('/transactions/income');
        return;
      }
      if (mob) {
        if (!pageExpenses & !pageIncome & (transType !== undefined)) {
          navigate('/transactions/');
          return;
        }
        if (pageIncome) {
          !incomesCategories && dispatch(incomeCategoriesThunk());
        }
        if (pageExpenses) {
          !expensesCategories && dispatch(expenseCategoriesThunk());
        }
        !incomesData && dispatch(getIncomeThunk());
        !expensesData && dispatch(getExpenseThunk());
      }
    }
  }, [transType, email]);

  return (
    <>
      {mob && !pageExpenses && !pageIncome && (
        <>
          <Balance />
          <div className={s.data}>
            <MyDate date={currentDate} />
          </div>
          <TransactionsTable mob={mob} />
          <TransactionsMobBtn />
        </>
      )}
      {mob && (pageExpenses || pageIncome) && (
        <>
          <GooBack />
          <IncomeForm/>
        </>
      )}
      {!mob && (
        <>
          <Balance />
          <div className={s.transactions}>
            <div className={s.wrap}>
              <nav className={s.nav}>
                <NavLink
                  className={pageExpenses ? s.linkActive : s.link}
                  to={'/transactions/expenses'}
                >
                  Expenses
                </NavLink>
                <NavLink className={pageIncome ? s.linkActive : s.link} to={'/transactions/income'}>
                  income
                </NavLink>
              </nav>
              <IncomeForm/>
              <div className={s.tableAndSummery}>
                <TransactionsTable mob={mob} pageIncome={pageIncome} pageExpenses={pageExpenses} />
                {desk && <p>ТУТ БУДЕТ SUMMARY</p>}
              </div>
            </div>
          </div>
          {!desk && !mob && <p>ТУТ БУДЕТ SUMMARY</p>}
        </>
      )}
    </>
  );
};

export default TransactionsPage;
