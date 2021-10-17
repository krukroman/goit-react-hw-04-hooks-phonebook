import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsEditor from './Components/ContactsEditor';
import ContactsList from './Components/ContactsList';
import ContactsFilter from './Components/ContactsFilter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    const newContacts = contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  }

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
