import React from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends React.Component {
  buildMarkup = () => {
    const contacts = this.props.contacts;
    const filter = this.props.filterText;
    const filteredContacts =
      contacts.length > 0
        ? filter
          ? contacts.filter(contact =>
              contact.name.toLowerCase().includes(filter.trim().toLowerCase())
            )
          : contacts
        : [];

    return filteredContacts.length > 0
      ? filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button onClick={() => this.handleDelete(contact.id)}>
              Delete
            </button>
          </li>
        ))
      : contacts.length > 0
      ? 'No matches for your filter :('
      : 'There are no contacts in your phonebook =(';
  };

  handleDelete = contactId => {
    this.props.handleDelete(contactId);
  };

  render() {
    return (
      <div>
        <ul>{this.buildMarkup()}</ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filterText: PropTypes.string.isRequired,
};
