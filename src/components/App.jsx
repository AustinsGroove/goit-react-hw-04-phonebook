import { Component } from 'react';
import { nanoid } from 'nanoid';
//
import InputForm from './InputForm/InputForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
//
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    const existNames = this.state.contacts.map(({ name }) => {
      return name.toLowerCase();
    });
    const isExist = existNames.includes(contact.name.toLowerCase());
    if (isExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [
          ...contacts,
          {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
          },
        ],
      };
    });
  };

  removeContact = ({ target }) => {
    const removableId = target.id;
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== removableId
      ),
    });
  };

  filterChange = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  renderFilteredContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({
        contacts: JSON.parse(localData),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <InputForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filterChange={this.filterChange} value={this.state.filter} />
        <ContactsList
          contacts={this.renderFilteredContacts()}
          removeContact={this.removeContact}
        />
      </>
    );
  }
}
