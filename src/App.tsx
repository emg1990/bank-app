import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import styles from './App.module.css';
import { AppProvider } from './contexts/AppContext';
import FloatingActions from './components/FloatingActions/FloatingActions';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <FloatingActions />
    </AppProvider>
  );
};

export default App;
