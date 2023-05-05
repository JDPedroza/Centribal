export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };

    case "SET_ACTIVE":
      return { ...state, active: payload };

    case "SET_ITEMS":
      return { ...state, items: payload };

    case "SET_OPEN_ITEM":
      return { ...state, openItem: payload };

    case "SET_DATA_ITEM":
      return { ...state, dataItem: payload };

    case "SET_ORDERS":
      return { ...state, orders: payload };

    case "SET_OPEN_ORDER":
      return { ...state, openOrder: payload };

    case "SET_DATA_ORDER":
      return { ...state, dataOrder: payload };

    default:
      break;
  }
};
