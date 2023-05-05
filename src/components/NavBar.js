import { useContext } from "react";

//desing
import { Grid, Icon, Typography } from "@material-ui/core";

import InventaryContext from "../context/InventaryContext";

import { Category, ShoppingCart } from "@material-ui/icons";

const NavBar = () => {
  const { active, handleActive } = useContext(InventaryContext);

  return (
    <Grid container>
      <Grid
        item
        sm={12}
        md={6}
        onClick={() => {
          handleActive(0);
        }}
      >
        <Typography
          variant="h6"
          style={{ color: active === 0 ? "blue" : "black" }}
		  align="center"
        >
          <Icon style={{ marginRight: 5 }}>
            <Category />
          </Icon>
          Artículos
        </Typography>
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        onClick={() => {
          handleActive(1);
        }}
      >
        <Typography
          variant="h6"
          style={{ color: active === 1 ? "blue" : "black" }}
		  align="center"
        >
          <Icon style={{ marginRight: 5 }}>
            <ShoppingCart />
          </Icon>
          Pedidos
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NavBar;
