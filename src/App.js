import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import ChartsAndMaps from './components/ChartsAndMaps';
import ContactManagement from './components/ContactManagement'; 
import axios from 'axios';


  function App() {
    

   

  return (
    <div className="App">


      <Router>
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/contact">
              
              <ContactManagement />
            </Route>
            <Route path="/charts-and-maps">
              <ChartsAndMaps />
            </Route>
            <Route path="/">
              <h2>Welcome to the Dashboard</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
               



  );
}

export default App;


