export const initialStore = () => {
  return {
    contacts: []   // 👈 aquí guardamos contactos
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    default:
      return store;
  }
}


