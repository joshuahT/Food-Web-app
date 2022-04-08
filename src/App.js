import Navigation from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Recepies from './pages/Recepies.js';
import React from 'react';
import UserContextProvider from './contexts/UserContext';


function App() {

  return (
    <div className='App'>
      <Navigation />
      <div className='content'>
        <Routes>
          <Route path="profile" element={
            <UserContextProvider>
              <Profile />
            </UserContextProvider>
          } />
          <Route path="recipies" element={<Recepies />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
