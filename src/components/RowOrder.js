import { useContext, useState } from "react";

//desing
import {
  TableCell,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

//icons
import { Edit, KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

//context
import InventaryContext from "../context/InventaryContext";

const RowOrder = (props) => {
  const { dataOrder, idxOrder } = props;
  const [open, setOpen] = useState(false);
  const { handleOpenOrder } = useContext(InventaryContext);

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{dataOrder.nid}</TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(Math.round(dataOrder.subtotal))}
        </TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(Math.round(dataOrder.total))}
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => handleOpenOrder(idxOrder)}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Artículos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Referencia</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Sub-total</TableCell>
                    <TableCell>Impuesto</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataOrder.items.map((dataItem) => (
                    <TableRow key={dataItem.reference}>
                      <TableCell>{dataItem.reference}</TableCell>
                      <TableCell>{dataItem.name}</TableCell>
                      <TableCell>{dataItem.quantity}</TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(Math.round(dataItem.subtotal_quantity))}
                      </TableCell>
                      <TableCell>{dataItem.tax}%</TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(Math.round(dataItem.subtotal_item))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowOrder;
