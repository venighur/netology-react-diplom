import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Product from './pages/Product';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
// styles
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner />
              <Routes>
                <Route path="/" index element={<Home />}/>
                <Route path="/catalog" element={<Catalog withSearch />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contacts" element={<Contacts />}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/catalog/:id" element={<Product />} />
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
