import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import MemberCards from './components/membercards';
import ContactForm from './components/contactform';

function App() {
return (
<Router>
<Header />
<main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/equipe" element={<div className="section-container"
><MemberCards /></div>} />
<Route path="/projets" element={<Home />} />
<Route path="/contact" element={<ContactForm />} />
</Routes>
</main>
<Footer />
</Router>
);
}

export default App;