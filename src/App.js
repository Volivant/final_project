import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Tariffs from './components/Tariffs';
import Faq from './components/Faq';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Search from './components/Search';
import SearchResult from './components/SearchResult';

import { useSelector } from "react-redux";

function App() {
    const user = useSelector(store => store);
    return (
        <div className="App">
            <Router>
                <header>
                    <Navbar user = { user }/>
                </header>
                <main>
                    <Routes>
                        <Route path='/' element = {<Home user = { user }/>} /> 
                        <Route path='/tariffs' element = {<Tariffs />} />
                        <Route path='/faq' element = {<Faq />} />
                        <Route path='/register' element = {<Register />} />
                        <Route path='/login' element = {<Login  user = { user }/>} />
                        <Route path='/search' element = {<Search user = { user } />}/>
                        <Route path='/search-result' element = {<SearchResult user = { user } />}/>
                    </Routes>                
                </main>
            </Router>
            <Footer />
        </div>
        
    );
}


export default App;
