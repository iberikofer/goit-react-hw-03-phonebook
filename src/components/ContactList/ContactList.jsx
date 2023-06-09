import React from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends React.Component {
  buildMarkup = () => {
    const contacts = this.props.contacts;
    const filter = this.props.filter;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );

    return filteredContacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}{' '}
        <button onClick={() => this.handleDelete(contact.id)}>Delete</button>
      </li>
    ));
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
  ).isRequired,
  filter: PropTypes.string.isRequired,
};
