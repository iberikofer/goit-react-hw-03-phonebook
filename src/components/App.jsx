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
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contactsList')),
    });
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
