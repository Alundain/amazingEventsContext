import './App.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Base from './components/Footer/Base';
import Home from './pages/Home';
import Past from './pages/Past';
import Upcoming from './pages/Upcoming';
import Contact from './pages/Contact';
import Stats from './pages/Stats';
import Header from './components/Header';
import Details from './pages/Details';
import StateContext from './store/StateContext';

function App() {

  let {loadEvents} = useContext(StateContext)
  


  useEffect(()=>{
    axios.get("https://mindhub-xj03.onrender.com/api/amazing").then(response=>{
      loadEvents(response.data.events);
      
  })
  }, [])

  return (
    <>
    <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/details/:id' element={< Details />}/>
            <Route path='/past' element={<Past />}/>
            <Route path='/upcoming' element={<Upcoming />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/stats' element={<Stats />}/>
            <Route path='*' element={<h2>No existe esta página</h2>}/>
          </Routes>
          <Base/>
    </Router>
    </>
  );
}

export default App
