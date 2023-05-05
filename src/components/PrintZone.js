import { useContext } from "react";

//context
import InventaryContext from "../context/InventaryContext";

//desing
import { Fab, IconButton, Tooltip } from "@material-ui/core";

//icons
import { Add } from "@material-ui/icons";

const PrintZone = () => {
  const { tables, active, handleOpenItem, handleOpenOrder } =
    useContext(InventaryContext);

  return (
    <div
      style={{ minHeight: "calc(100vh - 100px - 50px)", position: "relative" }}
    >
      {tables[active]}
      <div style={{ position: "absolute", bottom: 25, right: 25 }}>
        <Tooltip title={active === 0 ? "Agregar Artículo" : "Agregar Pedido"}>
          <Fab color="primary">
            <IconButton
              onClick={
                active === 0
                  ? () => {
                      handleOpenItem(null);
                    }
                  : () => {
                      handleOpenOrder(null);
                    }
              }
            >
              <Add />
            </IconButton>
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default PrintZone;
