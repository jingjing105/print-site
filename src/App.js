import React from 'react';
import Navbar from './Navbar'; 
import Home from './Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <Navbar /> 
         <Home />
      </header>
    </div>
  );
}

export default App;
