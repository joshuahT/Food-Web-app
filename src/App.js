import Navigation from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Recipes from './pages/Recipes.js';
import React from 'react';
import UserContextProvider from './contexts/UserContext';


function App() {

  return (
    <div className='App'>
      <Navigation />
      <div className='content'>
        <Routes>
          <Route
            exact path="/index"
            render={() => {
              return (
                <Navigate to="/" />
              )
            }}
          />
          <Route path="/" element={<Home />} />
          <Route path="profile" element={
            <UserContextProvider>
              <Profile />
            </UserContextProvider>
          } />
          <Route path="recipes" element={<Recipes />} />

        </Routes>
      </div>
    </div>

  );
}

export default App;
