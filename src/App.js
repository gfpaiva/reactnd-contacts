import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
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

  createContact(contact) {
    ContactsAPI.create(contact)
      .then(contact => {
        this.setState({
          contacts: this.state.contacts.concat([contact])
        })
      });
  }

  render() {
    return (
      <div>
        <Route exact path="/" render = {() => <ListContacts deteleHandler={this.removeContacts} contacts={this.state.contacts}/>} />
        <Route path="/create" render={({history}) => <CreateContact onCreateContact={contact => {
          this.createContact(contact);
          history.push('/');
        }} />} />
      </div>
    );
  }
}

export default App;
