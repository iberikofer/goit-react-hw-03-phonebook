import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filterText: '',
    };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem(this.storageKey);
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }

  handleSubbmit = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = newFilter => {
    this.setState({ filterText: newFilter });
  };

  handleDelete = contactId => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts, filterText } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 28,
          color: '#010101',
          backgroundColor: 'brown',
          gap: 50,
        }}
      >
        <h1>Life cycle Phonebook</h1>
        <ContactForm contacts={contacts} handleSubbmit={this.handleSubbmit} />
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList
          contacts={contacts}
          filterText={filterText}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
