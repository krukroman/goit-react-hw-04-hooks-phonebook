import { useState } from 'react';
import useLocalStorage from './Components/hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import ContactsEditor from './Components/ContactsEditor';
import ContactsList from './Components/ContactsList';
import ContactsFilter from './Components/ContactsFilter';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (!isContactExist(name)) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(prevContacts => [newContact, ...prevContacts]);
    } else {
      alert(`${name} is allready in contacts list`);
      return;
    }
  };

  const removeContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const isContactExist = str => {
    const normalizeedName = str.toLocaleLowerCase();

    return contacts.find(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeedName),
    );
  };

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return [...contacts]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter),
      );
  };

  return (
    <div>
      <ContactsEditor onSubmit={addContact} />
      <ContactsFilter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={getVisibleContacts()}
        onDeleteContact={removeContact}
      />
    </div>
  );
}
