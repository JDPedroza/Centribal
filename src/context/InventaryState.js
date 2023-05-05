import { useReducer } from "react";

//context
import InventaryContext from "./InventaryContext";
import InventaryReducer from "./InventaryReducer";
import ItemsTable from "../components/ItemsTable";
import OrdersTable from "../components/OrdersTable";

//apis
import { getItems } from "../server/getItems";
import { postItem } from "../server/postItem";
import { putItem } from "../server/putItem";
import { getOrders } from "../server/getOrders";
import { postOrder } from "../server/postOrder";
import { putOrder } from "../server/putOrder";

const InventaryState = (props) => {
  const initialState = {
    loading: true,
    active: 0,
    tables: [<ItemsTable />, <OrdersTable />],
    items: [],
    openItem: false,
    openOrder: false,
    dataItem: {},
    orders: [],
    dataOrder: {},
  };

  const [state, dispatch] = useReducer(InventaryReducer, initialState);

  const handleActive = (idx) => {
    dispatch({ type: "SET_ACTIVE", payload: idx });
  };

  const loadItems = async () => {
    let data = await getItems();
    dispatch({ type: "SET_ITEMS", payload: data.data });
  };

  const handleOpenItem = (idx) => {
    if (idx !== null) {
      dispatch({ type: "SET_DATA_ITEM", payload: state.items[idx] });
    } else {
      dispatch({ type: "SET_DATA_ITEM", payload: {} });
    }
    dispatch({ type: "SET_OPEN_ITEM", payload: !state.openItem });
  };

  const handleItem = (data) => {
    let tempItems = state.items;
    if (Object.entries(state.dataItem).length !== 0) {
      putItem(data);
      let index = tempItems.findIndex((e) => e.id === data.id);
      tempItems[index] = data;
    } else {
      postItem(data);
      tempItems.push(data);
    }
    dispatch({ type: "SET_ITEMS", payload: tempItems });
    handleOpenItem(null);
  };

  const loadOrders = async () => {
    let data = await getOrders();
    dispatch({ type: "SET_ORDERS", payload: data.data });
  };

  const handleOpenOrder = (idx) => {
    if (idx !== null) {
      dispatch({ type: "SET_DATA_ORDER", payload: state.orders[idx] });
    } else {
      dispatch({ type: "SET_DATA_ORDER", payload: {} });
    }
    dispatch({ type: "SET_OPEN_ORDER", payload: !state.openOrder });
  };

  const handleOrder = (data) => {
    let tempOrders = state.orders;
    if (Object.entries(state.dataOrder).length !== 0) {
      putOrder(data);
      let index = tempOrders.findIndex((e) => e.id === data.id);
      tempOrders[index] = data;
    } else {
      postOrder(data);
      tempOrders.push(data);
    }
    dispatch({ type: "SET_ORDERS", payload: tempOrders });
    handleOpenOrder(null);
  };


  return (
    <InventaryContext.Provider
      value={{
        ...state,
        handleActive,
        loadItems,
        handleOpenItem,
        handleItem,
        loadOrders,
        handleOpenOrder,
        handleOrder,
      }}
    >
      {props.children}
    </InventaryContext.Provider>
  );
};

export default InventaryState;
