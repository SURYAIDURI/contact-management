import React, { useState } from 'react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '' });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false); 

  const addContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: '', email: '' });
    }
  };

  const updateContact = () => {
    if (selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact === selectedContact ? { ...contact, ...newContact } : contact
      );
      setContacts(updatedContacts);
      setSelectedContact(null);
      setNewContact({ name: '', email: '' });
    }
  };

  const deleteContact = (contact) => {
    const updatedContacts = contacts.filter((c) => c !== contact);
    setContacts(updatedContacts);
  };

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  return (
    <div>
      <h2>Contact Management</h2>
      <div>
        <h3>Add/Edit Contact</h3>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        {selectedContact ? (
          <button onClick={updateContact}>Update Contact</button>
        ) : (
          <button onClick={addContact}>Add Contact</button>
        )}
      </div>
      <div>
        <h3>Contact List</h3>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.email}>
              {contact.name} ({contact.email}){' '}
              <button onClick={() => setSelectedContact(contact)}>Edit</button>{' '}
              <button onClick={() => deleteContact(contact)}>Delete</button>{' '}
              <button onClick={() => viewContactDetails(contact)}>View Details</button>
            </li>
          ))}
        </ul>
      </div>
      {showDetails && selectedContact && (
        <div>
          <h3>Contact Details</h3>
          <p>Name: {selectedContact.name}</p>
          <p>Email: {selectedContact.email}</p>
          <button onClick={() => setShowDetails(false)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
