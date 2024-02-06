import React from 'react';
// import JobCategoriesPage from "./JobCategoriesPage";
import JobOffersPage from "./JobOffersPage";
import HelloWorld from './HelloWorld';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<p>Strona domowa</p>} />
          <Route path="/categories" />
          <Route path="/offers" element={<JobOffersPage />} />
          <Route path="/praca" />
          <Route path="/helloworld" element={<HelloWorld />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
