import React from 'react';
import Header from './components/user/Header.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';




const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet/>
    </>
  );
};

export default App;