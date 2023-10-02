import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { RouterProvider as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import Tariffs from './components/Tariffs';
import Faq from './components/Faq';
import Login from './components/Login/Login';
import Register from './components/Register';
import Footer from './components/Navigation/Footer';
import Search from './components/Search/Search';
import SearchResult from './components/Search/SearchResult';

import { useSelector } from "react-redux";

function App() {
    const user = useSelector(store => store);
    return (
        <Router>
            <div className="App">
                
                    <header>
                        <Navbar user = { user }/>
                    </header>
                    <main>
                        <Routes>
                            <Route exact path='/' element = {<Home user = { user }/>} /> 
                            <Route path='/tariffs' element = {<Tariffs />} />
                            <Route path='/faq' element = {<Faq />} />
                            <Route path='/register' element = {<Register />} />
                            <Route path='/login' element = {<Login  user = { user }/>} />
                            <Route path='/search' element = {<Search user = { user } />}/>
                            <Route path='/search-result' element = {<SearchResult user = { user } />}/>
                        </Routes>                
                    </main>
                
                <Footer />
            </div>
        </Router>
    );
}


export default App;
