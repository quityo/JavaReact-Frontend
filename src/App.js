import './App.css';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider } from 'semantic-ui-react';
import Navi from './layouts/Navi';


function App() {
  return (
    <div className="App">
     <Navi/>
     <br/><br/><br/>
     <h1 style={{fontSize:"50px",marginLeft:"3%", fontFamily:"Star Jedi"}}>Funky Sun</h1>
       <p2 style={{fontSize:"18px",marginLeft:"3%"}}><i>Human Resource Management</i></p2>
      <Divider/>
      <Container className="main">
         <Dashboard/>
      </Container> 
    </div>
  );
}

export default App;
