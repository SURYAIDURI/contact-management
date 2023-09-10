import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addContact as addContactAction, updateContact as updateContactAction, deleteContact as deleteContactAction } from '../actions/contactActions';

const ContactManagement = ({ contacts, addContactAction, updateContactAction, deleteContactAction }) => {
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'active',
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createContact = () => {
    if (newContact.firstName && newContact.lastName && newContact.email) {
      if (validateEmail(newContact.email)) {
        if (selectedContact) {
          const updatedContacts = contacts.map((contact) =>
            contact.email === selectedContact.email ? newContact : contact
          );
          updateContactAction(updatedContacts);
        } else {
          addContactAction([...contacts, newContact]);
        }
        setNewContact({
          firstName: '',
          lastName: '',
          email: '',
          status: 'active',
        });
        setEmailError(null);
        setSelectedContact(null);
      } else {
        setEmailError('Invalid email address. Please enter a valid email.');
      }
    }
  };

  const editContact = (contact) => {
    setNewContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      status: contact.status,
    });
    setSelectedContact(contact);
  };

  const deleteContact = (contact) => {
    const updatedContacts = contacts.filter((c) => c !== contact);
    deleteContactAction(updatedContacts);
    setSelectedContact(null);
  };

  const toggleStatus = () => {
    if (selectedContact) {
      const updatedStatus = selectedContact.status === 'active' ? 'inactive' : 'active';
      const updatedContacts = contacts.map((contact) =>
        contact === selectedContact ? { ...selectedContact, status: updatedStatus } : contact
      );
      updateContactAction(updatedContacts);
    }
  };

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  return (
    <div>
      <h2>Contact Management</h2>
      <div>
        <h3>Create Contact</h3>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={newContact.firstName}
            onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={newContact.lastName}
            onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newContact.email}
            onChange={(e) => {
              setNewContact({ ...newContact, email: e.target.value });
              setEmailError(null);
            }}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select
            value={newContact.status}
            onChange={(e) => setNewContact({ ...newContact, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {selectedContact ? (
          <>
            <button onClick={createContact}>Update Contact</button>
            <button onClick={toggleStatus}>
              {selectedContact.status === 'active' ? 'Deactivate Contact' : 'Activate Contact'}
            </button>
          </>
        ) : (
          <button onClick={createContact}>Create Contact</button>
        )}
      </div>
      <div>
        <h3>Contact List</h3>
        {contacts.length === 0 ? (
          <p>No contacts found. Click the button above to create a contact.</p>
        ) : (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.email}>
                <p>
                  <strong>First Name:</strong> {contact.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {contact.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Status:</strong> {contact.status}
                </p>
                <button onClick={() => editContact(contact)}>Edit</button>{' '}
                <button onClick={() => deleteContact(contact)}>Delete</button>{' '}
                <button onClick={() => viewContactDetails(contact)}>View Details</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showDetails && selectedContact && (
        <div>
          <h3>Contact Details</h3>
          <p>
            <strong>First Name:</strong> {selectedContact.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {selectedContact.lastName}
          </p>
          <p>
            <strong>Email:</strong> {selectedContact.email}
          </p>
          <p>
            <strong>Status:</strong> {selectedContact.status}
          </p>
          <button onClick={() => setShowDetails(false)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, { addContactAction, updateContactAction, deleteContactAction })(ContactManagement);
