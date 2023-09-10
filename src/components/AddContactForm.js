import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contacts/actions';

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [newContact, setNewContact] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(newContact));
    setNewContact({ name: '', email: '' });
  };

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContactForm;
