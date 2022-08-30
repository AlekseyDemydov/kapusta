import s from './BalanceForm.module.scss';
import NumberFormat from 'react-number-format';
import BalanceModal from 'components/BalanceModal/BalanceModal';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getAuthBalance } from 'redux/auth/AuthSelectors';
import { useEffect } from 'react';
import { useState } from 'react';
import { newBalance } from 'redux/auth/authOperations';
import { getTransactionsBalance } from 'redux/transactions/transactionsSelector';
import { updateBalance } from 'redux/transactions/transactionsSlice';

const BalanceForm = ({ isReportsPage }) => {
  const [balance, setBalance] = useState();

  const dispatch = useDispatch();
  const desk = useMediaQuery({ query: '(min-width: 1280px)' });

  const getBalanceUser = useSelector(getAuthBalance);
  const getBalance = useSelector(getTransactionsBalance);

  useEffect(() => {
    if (!getBalance) dispatch(updateBalance(getBalanceUser));
    if (getBalance === 0 || balance === getBalance) return;
    setBalance(getBalance);
  }, [getBalance, getBalanceUser, balance, dispatch]);

  const handleChange = e => {
    const value = e.target.value;

    setBalance(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const sliceValue = balance
      .slice(0, balance.length - 4)
      .split(' ')
      .join('');
    const mathRound = Math.round(sliceValue);

    dispatch(newBalance({ newBalance: mathRound }));
  };
  return (
    <div className={isReportsPage ? s.balanceReports : s.balance}>
      <p className={s.title}>Balance:</p>
      <form onSubmit={handleSubmit} className={s.form}>
        <NumberFormat
          className={isReportsPage ? s.inputRepots : s.input}
          disabled={getBalance > 0}
          name="balance"
          suffix={' UAH'}
          allowLeadingZeros={true}
          thousandSeparator={' '}
          decimalScale={2}
          placeholder={'00.00 UAH'}
          fixedDecimalScale={true}
          allowNegative={false}
          onChange={handleChange}
          value={balance}
        />
        {isReportsPage && desk && (
          <button type="submit" className={s.submit} disabled={getBalance > 0}>
            Confirm
          </button>
        )}
        {!isReportsPage && (
          <button type="submit" className={s.submit} disabled={getBalance > 0}>
            Confirm
          </button>
        )}
      </form>
      {getBalance === 0 && <BalanceModal />}
    </div>
  );
};

export default BalanceForm;
