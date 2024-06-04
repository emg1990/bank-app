import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Filler from './components/Filler';
import NewTransfer from './components/NewTransfer/NewTransfer';
import Home from './components/Home/Home';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Filler />} />
          <Route path="/create-account" element={<>Create</>} />
          <Route path="/edit-account/:id" element={<>Edit/Delete</>} />
        </Routes>
      </div>
      <NewTransfer />
    </Router>
  );
};

export default App;
