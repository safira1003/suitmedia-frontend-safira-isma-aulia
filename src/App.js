import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import WorkPage from './pages/Work';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import IdeasPage from './pages/Ideas';
import CareersPage from './pages/Careers';
import ContactPage from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<IdeasPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
