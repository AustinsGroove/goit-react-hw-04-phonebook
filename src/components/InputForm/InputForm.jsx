import { useState } from 'react';
import Wrapper from './InputForm.styled';
//

const InputForm = ({ addContact }) => {
  const [userData, setUserData] = useState({
    name: '',
    number: '',
  });

  const { name, number } = userData;

  const handleChange = ({ target: { name, value } }) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    addContact(userData);
    clearForm();
  };

  const clearForm = () => {
    setUserData({
      name: '',
      number: '',
    });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="subbmit">Add contact</button>
      </form>
    </Wrapper>
  );
};

export default InputForm;
