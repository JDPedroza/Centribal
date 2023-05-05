import { useContext, useEffect } from "react";

//desing
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

//contexts
import InventaryContext from "../context/InventaryContext";

//componets
import RowOrder from "./RowOrder";

//const
const attributes = [
  { attribute: "nid", label: "IDENTIFICADOR", type: "text", align: "left" },
  {
    attribute: "subtotal",
    label: "TOTAL SIN IMPUESTOS",
    type: "money",
    align: "right",
  },
  {
    attribute: "total",
    label: "TOTAL CON IMPUESTOS",
    type: "money",
    align: "right",
  },
];

const OrdersTable = () => {
  const { active, orders, loadOrders } = useContext(InventaryContext);

  useEffect(() => {
    loadOrders();
  }, [active]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {attributes.map((jsonAttr, idxAttr) => (
              <TableCell
                key={`data_head_${jsonAttr.attribute}_${idxAttr}`}
                align={jsonAttr.align}
              >
                {jsonAttr.label}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((dataOrder, idxOrder) => (
            <RowOrder dataOrder={dataOrder} idxOrder={idxOrder} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
