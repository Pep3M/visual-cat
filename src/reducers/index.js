const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PELI_SELECTION":
      return {
        ...state,
        pelis: [...state.pelis, action.payload],
      };

    case "DELETE_PELI_SELECTION":
      return {
        ...state,
        pelis: state.pelis.filter(
          (items) => items.Nombre !== action.payload.Nombre
        ),
      };

    default:
      return state;
  }
};

export default reducer;
