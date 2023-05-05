import { useContext, useEffect } from "react";

//desing
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";

//contexts
import InventaryContext from "../context/InventaryContext";

//icons
import { Edit } from "@material-ui/icons";

//const
const attributes = [
  { attribute: "reference", label: "REFERENCIA", type: "text" },
  { attribute: "name", label: "NOMBRE", type: "text" },
  { attribute: "description", label: "DESCRIPCIÓN", type: "text" },
  { attribute: "value", label: "VALOR", type: "money" },
];

const ItemsTable = () => {
  const { active, loadItems, items, handleOpenItem } =
    useContext(InventaryContext);

  useEffect(() => {
    loadItems();
  }, [active]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {attributes.map((jsonAttr, idxAttr) => (
              <TableCell key={`data_head_${jsonAttr.attribute}_${idxAttr}`}>
                {jsonAttr.label}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((dataItem, idxItem) => (
            <TableRow key={`data_item_${idxItem}`}>
              {attributes.map((jsonAttr, idxAttr) => (
                <TableCell key={`data_cell_${jsonAttr}_${idxAttr}`}>
                  {jsonAttr.type === "money"
                    ? new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      }).format(Math.round(dataItem[jsonAttr.attribute]))
                    : dataItem[jsonAttr.attribute]}
                </TableCell>
              ))}
              <TableCell key={`data_cell_edit_5`}>
                <Tooltip title="Modificar Artículo">
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleOpenItem(idxItem);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
