
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const addContact = (contacts) => ({
  type: ADD_CONTACT,
  payload: contacts,
});

export const updateContact = (contacts) => ({
  type: UPDATE_CONTACT,
  payload: contacts,
});

export const deleteContact = (contacts) => ({
  type: DELETE_CONTACT,
  payload: contacts,
});
