import { Link } from 'react-router-dom';
import icon from '../../images/icon.svg';
import s from './Header.module.scss';
import { useMediaQuery } from 'react-responsive';
// import Modal from 'components/Modal/Modal';



// import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  // const dispatch = useDispatch();
  // const email = useSelector();
  // const auth = useSelector();
  /* email и auth снизу это заглушки после подкл useSelector удалить */
  const email = 'viamur@gmail.com';
  const auth = true;
  const emailNormaliza = email.split('')[0];

  const mob = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/" className={s.link}>
          <svg width={90} height={31}>
            <use href={`${icon}#icon-logo_kapusta`} />
          </svg>
        </Link>
        {auth && (
          <div className={s.wrap}>
            <span className={s.span}>{emailNormaliza}</span>
            {!mob && <p className={s.name}>{email}</p>}
            <button type="button" className={s.btn}>
              {mob ? (
                <svg width={16} height={16}>
                  <use href={`${icon}#icon-logout1`} />
                </svg>
              ) : (
                <p className={s.exit}>Exit</p>
              )}
            </button>
          </div>
        )}
      </div>
      <Modal title={"leave"} onClose={onClose}/>
    </header>
  );
};
export default Header;
