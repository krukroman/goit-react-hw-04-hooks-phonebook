import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsEditor from './Components/ContactsEditor';
import ContactsList from './Components/ContactsList';
import ContactsFilter from './Components/ContactsFilter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (!this.isContactExist(name)) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    } else {
      alert(`${name} is allready in contacts list`);
      return;
    }
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => {
        return contact.id !== contactId;
      }),
    }));
  };

  isContactExist(str) {
    const { contacts } = this.state;
    const normalizeedName = str.toLocaleLowerCase();

    return contacts.find(stateContact =>
      stateContact.name.toLocaleLowerCase().includes(normalizeedName),
    );
  }

  changeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return [...contacts]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter),
      );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <ContactsEditor onSubmit={this.addContact} />
        <ContactsFilter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}
