import "./App.css";
import Dashboard from "./layouts/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import Navi from "./layouts/Navi";
import Footer from "./layouts/Footer";

function App() {
  return (
    
    <div className="App">
      <Navi />
   {/*    <br />
      <div  style={{
          marginLeft: "32%"
    }}>
      <Filter /></div> */}
      <br />
      <h2
        style={{
          fontSize: "60px",
          margin: "0 auto",
          marginLeft: "40px",
          fontFamily: "Star Jedi",
        }}
      >
        Funky Sun
      </h2>
      <br />
      <p2 style={{ fontSize: "18px", margin: "auto", marginLeft: "50px" }}>
        <i>Human Resource Management System</i>
      </p2>
      <Divider />

      <Container className="main">
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
}
export default App;
