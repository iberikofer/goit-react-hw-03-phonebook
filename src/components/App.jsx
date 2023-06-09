import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }
  componentDidMount() {
    const defaultArr = [
      { name: 'Yaroslav Sych', number: '057-00-63', id: 'id-1' },
      { name: 'Rosie Simpson', number: '459-12-56', id: 'id-2' },
      { name: 'Alexandr Repeta', number: '645-17-79', id: 'id-3' },
      { name: 'Annie Copeland', number: '227-91-26', id: 'id-4' },
    ];
    const storedContacts = JSON.parse(localStorage.getItem('contactsList'));
    if (storedContacts && storedContacts.length > 0) {
      this.setState({ contacts: storedContacts });
    } else {
      localStorage.setItem('contactsList', JSON.stringify(defaultArr));
      this.setState({
        contacts: defaultArr,
      });
    }
  }

  handleSubbmit = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
  }

  handleFilter = newFilter => {
    this.setState(() => ({
      filter: newFilter,
    }));
  };

  handleDelete = contactId => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { contacts, filter } = this.state;
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
          filter={filter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
