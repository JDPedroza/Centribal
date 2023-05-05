import { useContext, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";

//context
import InventaryContext from "../context/InventaryContext";

//packages
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";

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

const DialogItem = () => {
  const { openItem, handleOpenItem, handleItem, dataItem } =
    useContext(InventaryContext);

  const [data, setData] = useState({
    reference: "",
    name: "",
    description: "",
    value: "",
    tax: "",
  });

  const [error, setError] = useState({
    reference: false,
    name: false,
    description: false,
    value: false,
    tax: false,
  });

  const [change, setChange] = useState(false);

  useEffect(() => {
    if (Object.entries(dataItem).length !== 0) {
      setData(dataItem);
    } else {
      setData((prev) => ({
        ...prev,
        reference: uuidv4().toString().toUpperCase().split("-")[0],
      }));
    }
  }, [dataItem]);

  const changeData = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
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
    setError(error);
    setChange(!change);
    return done;
  };

  const handleSend = () => {
    if (validation()) {
      handleItem(data);
      setData({
        reference: "",
        name: "",
        description: "",
        value: "",
      });
    }
  };

  return (
    <Dialog
      open={openItem}
      onClose={() => {
        handleOpenItem(null);
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Agregar Artículo</DialogTitle>
      <DialogContent key={`${change ? "asd" : "das"}`}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              label="Referencia"
              name="reference"
              onChange={changeData}
              value={data.reference}
              error={error.reference}
              variant="outlined"
              fullWidth
              type="text"
              disabled
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Nombre"
              name="name"
              onChange={changeData}
              value={data.name}
              error={error.name}
              variant="outlined"
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Valor"
              name="value"
              onChange={changeData}
              value={data.value}
              error={error.value}
              variant="outlined"
              fullWidth
              type="text"
              InputProps={{
				inputComponent: MoneyInput,
			  }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Descripción"
              name="description"
              onChange={changeData}
              value={data.description}
              error={error.description}
              variant="outlined"
              fullWidth
              type="text"
              multiline
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          style={{ marginRight: 10 }}
          color="primary"
          onClick={() => {
            handleOpenItem(null);
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

export default DialogItem;
