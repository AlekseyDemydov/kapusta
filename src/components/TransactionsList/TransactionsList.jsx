import icon from '../../images/icon.svg';
import s from './TransactionsList.module.scss';

const TransactionsList = ({ data, mob }) => {
  return (
    <ul className={s.list}>
      {data.map((el, idx) => (
        <li key={el ? el['_id'] : idx} className={s.item}>
          {el && (
            <>
              <div className={s.wrapA}>
                {mob ? (
                  <>
                    <p className={s.desc}>{el.description}</p>
                    <div className={s.wrapB}>
                      <p className={s.date}>{el.date}</p>
                      <p className={s.category}>{el.category}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={s.wrapB}>
                      <p className={s.date}>{el.date}</p>
                      <p className={s.desc}>{el.description}</p>
                    </div>
                    <p className={s.category}>{el.category}</p>
                  </>
                )}
              </div>
              <div className={s.wrapC}>
                {el.expense ? (
                  <p className={s.amountExpense}>{`- ${el.amount}.00 uah.`}</p>
                ) : (
                  <p className={s.amountIncome}>{` ${el.amount}.00 uah.`}</p>
                )}
                <button type="button" className={s.btn}>
                  <svg width={18} height={18}>
                    <use href={`${icon}#icon-delete1`} />
                  </svg>
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
