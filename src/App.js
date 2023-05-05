//css
import "./App.css";

//desing
import { Container, Paper } from "@material-ui/core";

//context
import InventaryState from "./context/InventaryState";

import NavBar from "./components/NavBar";
import PrintZone from "./components/PrintZone";
import DialogItem from "./components/DialogItem";
import DialogOrder from "./components/DialogOrder";

//components

const App = () => {
  return (
    <InventaryState>
      <Container>
        <Paper className="paper nav">
          <NavBar />
        </Paper>
        <Paper className="paper container">
          <PrintZone />
        </Paper>
      </Container>
      <DialogItem />
      <DialogOrder />
    </InventaryState>
  );
};

export default App;
