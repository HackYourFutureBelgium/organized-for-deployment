import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
       
        <Switch>
        <Route path='/' exact component={Home} />
     
        </Switch>
          <Footer />
      </Router>
     
    </>
  );
}

export default App;