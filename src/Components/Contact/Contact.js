import PropTypes from 'prop-types';
import s from './Contact.module.css';
export default function Contact({ name, number, onDelete }) {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <p className={s.name}>{name}</p>
        <p className={s.number}>{number}</p>
      </div>
      <button className={s.btn} type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
