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

    case "SET_OPEN_MODAL_CART":
      return {
        ...state,
        openModalCart: action.payload,
      };
    
    case "SET_OPEN_SENDED":
      return {
        ...state,
        openSended: action.payload,
      };

    case "SET_DEL_ALL_SELECTION":
      return {
        ...state,
        pelis: [],
        series: [],
        novelas: [],
        anime: [],
      };

    default:
      return state;
  }
};

export default reducer;
