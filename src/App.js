import './App.css';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import { Container, Divider } from 'semantic-ui-react';
import Navi from './layouts/Navi';


function App() {
  return (
    <div className="App">
     <Navi/>
     <br/><br/>
     <h2 style={{fontSize:"50px",margin:"auto", fontFamily:"Star Jedi"}}>Funky Sun</h2>
     <br/>
       <p2 style={{fontSize:"18px",margin:"auto",}}><i>Human Resource Management System</i></p2>
      <Divider/>
      <Container className="main">
         <Dashboard/>
      </Container> 
    </div>
  );
}

export default App;
