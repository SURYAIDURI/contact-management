import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../actions/contactActions';

const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
    case UPDATE_CONTACT:
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
