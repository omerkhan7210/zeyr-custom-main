import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import AboutPage from './Components/AboutPage';
import MenPage from './Components/MenPage';
import ContactPage from './Components/ContactPage';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<MenPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route exact path="/login" element={<LoginForm/>} />
        <Route exact path="/signup" element={<SignupForm/>} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
