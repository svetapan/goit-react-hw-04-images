import { FaSpinner } from 'react-icons/fa';
import css from './Loader.module.css';

export default function Loader() {
    return (
      <div className={css.load}>
        <FaSpinner className={css.icon} />
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </div>
    );
  }