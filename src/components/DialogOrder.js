import { useContext, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@material-ui/core";

//context
import InventaryContext from "../context/InventaryContext";

//packages
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";

//icons
import { Add, Delete } from "@material-ui/icons";

//functions
function MoneyInput(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function PercentInput(props) {
  const { value, inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        values.floatValue > 100
          ? onChange({
              target: {
                name: props.name,
                value: "100",
              },
            })
          : onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
      }}
      decimalScale={value >= 100 ? 0 : 2}
      decimalSeparator=","
      isNumericString
      suffix="%"
    />
  );
}

const DialogOrder = () => {
  const { openOrder, handleOpenOrder, dataOrder, items, handleOrder } =
    useContext(InventaryContext);

  useEffect(() => {
    const references = items.map((item) => item.reference);
    const names = items.map((item) => item.name);
    const values = items.map((item) => item.value);
    setLists({ references, names, values });
  }, [items]);

  const [data, setData] = useState({
    nid: "",
    subtotal: "",
    total: "",
  });

  const [lists, setLists] = useState({ references: [], names: [], values: [] });

  const [dataItems, setDataItems] = useState([
    {
      reference: "",
      name: "",
      value: "",
      quantity: 1,
      subtotal_quantity: "",
      tax: 0,
      subtotal_item: "",
    },
  ]);

  const [error, setError] = useState({
    nid: false,
    subtotal: false,
    total: false,
  });

  const [errorItems, setErrorItems] = useState([
    {
      reference: false,
      name: false,
      value: false,
      quantity: false,
      tax: false,
    },
  ]);

  const [change, setChange] = useState(false);

  useEffect(() => {
    if (Object.entries(dataOrder).length !== 0) {
      let jsonOrder = {
        id: dataOrder.id,
        nid: dataOrder.nid,
        subtotal: dataOrder.subtotal,
        total: dataOrder.total,
      };
      let tempDataItems = dataOrder.items;
      let tempErrorsItems = dataOrder.items.map(() => {
        return {
          reference: false,
          name: false,
          value: false,
          quantity: false,
          tax: false,
        };
      });
      setData(jsonOrder);
      setDataItems(tempDataItems);
      setErrorItems(tempErrorsItems);
    } else {
      setData((prev) => ({
        ...prev,
        nid: uuidv4().toString().toUpperCase().split("-").pop(),
      }));
    }
  }, [dataOrder]);

  const changeData = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const handleChangeLists = (e, index) => {
    const { name, value } = e.target;
    const indexList = lists[name].findIndex((e) => e === value);
    let tempDataItems = dataItems;

    tempDataItems[index] = {
      ...tempDataItems[index],
      reference: lists.references[indexList],
      name: lists.names[indexList],
      value: lists.values[indexList],
      subtotal_quantity:
        lists.values[indexList] * tempDataItems[index].quantity,
      subtotal_item:
        lists.values[indexList] *
          tempDataItems[index].quantity *
          (tempDataItems[index].tax / 100) +
        lists.values[indexList] * tempDataItems[index].quantity,
    };
    handleValues(tempDataItems);
    setDataItems(tempDataItems);
    setChange(!change);
  };

  const handleChangeItem = (e, index) => {
    const { value, name } = e.target;
    let tempDataItems = dataItems;
    tempDataItems[index] = {
      ...tempDataItems[index],
      [name]: parseFloat(value),
    };
    tempDataItems[index] = {
      ...tempDataItems[index],
      subtotal_quantity:
        tempDataItems[index].value * tempDataItems[index].quantity,
      subtotal_item:
        tempDataItems[index].value *
          tempDataItems[index].quantity *
          (tempDataItems[index].tax / 100) +
        tempDataItems[index].value * tempDataItems[index].quantity,
    };
    handleValues(tempDataItems);
    setDataItems(tempDataItems);
    setChange(!change);
  };

  const handleValues = (tempDataItems) => {
    const reducerQuantity = (accumulator, currentValue) =>
      accumulator + currentValue.subtotal_quantity;
    const subtotal = tempDataItems.reduce(reducerQuantity, 0);
    const reducerItem = (accumulator, currentValue) =>
      accumulator + currentValue.subtotal_item;
    const total = tempDataItems.reduce(reducerItem, 0);
    setData((prev) => ({ ...prev, subtotal: subtotal, total: total }));
  };

  const handleAddItem = () => {
    dataItems.push({
      reference: "",
      name: "",
      value: "",
      quantity: 1,
      subtotal_quantity: "",
      tax: 0,
      subtotal_item: "",
    });
    errorItems.push({
      reference: false,
      name: false,
      value: false,
      quantity: false,
      tax: false,
    });
    setErrorItems(errorItems);
    setDataItems(dataItems);
    setChange(!change);
  };

  const handleDeleteItem = (idx) => {
    dataItems.splice(idx, 1);
    errorItems.splice(idx, 1);
    setErrorItems(errorItems);
    setDataItems(dataItems);
    handleValues(dataItems);
    setChange(!change);
  };

  const validation = () => {
    let tempError = error;
    let done = true;
    for (const attribute in error) {
      if (data[attribute] === "") {
        tempError[attribute] = true;
        done = false;
      } else {
        tempError[attribute] = false;
      }
    }
    const guideErrorsItems = ["reference", "name", "value", "quantity", "tax"];
    let tempErrorItems = errorItems;
    for (let i = 0; i < dataItems.length; i++) {
      for (let j = 0; j < guideErrorsItems.length; j++) {
        if (dataItems[i][guideErrorsItems[j]] === "") {
          tempErrorItems[i][guideErrorsItems[j]] = true;
          done = false;
        } else {
          tempErrorItems[i][guideErrorsItems[j]] = false;
        }
      }
    }
    setErrorItems(tempErrorItems);
    setError(error);
    setChange(!change);
    return done;
  };

  const handleSend = () => {
    if (validation()) {
      handleOrder({ ...data, items: dataItems });
    }
  };

  return (
    <Dialog
      open={openOrder}
      onClose={() => {
        handleOpenOrder(null);
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Agregar Pedido</DialogTitle>
      <DialogContent key={`${change ? "asd" : "das"}`}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              label="Identificador"
              name="nid"
              onChange={changeData}
              value={data.nid}
              error={error.nid}
              variant="outlined"
              fullWidth
              type="text"
              disabled
            />
          </Grid>
          <Grid item sm={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Referencia</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Sub-Total</TableCell>
                    <TableCell>Impuesto</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      <Tooltip title="Agregar artículo">
                        <IconButton size="small" onClick={handleAddItem}>
                          <Add />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataItems.map((dataItem, idxItem) => (
                    <TableRow>
                      <TableCell>
                        <FormControl
                          fullWidth
                          error={errorItems[idxItem].reference}
                        >
                          <Select
                            name="references"
                            value={dataItem.reference}
                            onChange={(e) => {
                              handleChangeLists(e, idxItem);
                            }}
                          >
                            {lists.references.map((reference) => (
                              <MenuItem value={reference}>{reference}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth error={errorItems[idxItem].name}>
                          <Select
                            name="names"
                            value={dataItem.name}
                            onChange={(e) => {
                              handleChangeLists(e, idxItem);
                            }}
                          >
                            {lists.names.map((name) => (
                              <MenuItem value={name}>{name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="quantity"
                          onChange={(e) => {
                            handleChangeItem(e, idxItem);
                          }}
                          value={dataItem.quantity}
                          error={errorItems[idxItem].quantity}
                          fullWidth
                          type="number"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="subtotal_quantity"
                          value={dataItem.subtotal_quantity}
                          fullWidth
                          type="text"
                          disabled
                          InputProps={{
                            inputComponent: MoneyInput,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="tax"
                          onChange={(e) => {
                            handleChangeItem(e, idxItem);
                          }}
                          value={dataItem.tax}
                          error={errorItems[idxItem].tax}
                          fullWidth
                          InputProps={{
                            endAdornment: "%",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="subtotal_item"
                          value={dataItem.subtotal_item}
                          fullWidth
                          type="text"
                          disabled
                          InputProps={{
                            inputComponent: MoneyInput,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Eliminar Artículo">
                          <IconButton
                            size="small"
                            onClick={() => {
                              handleDeleteItem(idxItem);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={6}>
            <Typography align="center">
              SUBTOTAL:{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(Math.round(data.subtotal))}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography align="center">
              TOTAL:{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(Math.round(data.total))}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          style={{ marginRight: 10 }}
          color="primary"
          onClick={() => {
            handleOpenOrder(null);
          }}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          style={{ color: "white" }}
          color="primary"
          onClick={handleSend}
        >
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOrder;
