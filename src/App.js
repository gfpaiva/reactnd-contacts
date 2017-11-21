import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => {
        this.setState({ contacts });
      })
  }

  removeContacts = contact => {
    this.setState(curr => ({
      contacts: curr.contacts.filter(c => c.id !== contact.id )
    }));

    ContactsAPI.remove(contact);
  };

  render() {
    return (
      <div>
        <ListContacts deteleHandler={this.removeContacts} contacts={this.state.contacts}/>
      </div>
    );
  }
}

export default App;
