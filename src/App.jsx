import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';

function App() {
  const router = Router();
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App
