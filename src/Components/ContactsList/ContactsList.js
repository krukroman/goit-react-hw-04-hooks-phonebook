import Contact from '../Contact';
import PropTypes from 'prop-types';

import s from './ContactsList.module.css';

export default function ContactsList({ contacts, onDeleteContact }) {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Contacts</h2>
      {contacts.length !== 0 ? (
        <ul className={s.list}>
          {contacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={s.item}>
                <Contact
                  name={name}
                  number={number}
                  onDelete={() => onDeleteContact(id)}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={s.status}>Contacts list is empty. Please add contact</p>
      )}
    </div>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
