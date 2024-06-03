import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <>Header</>
      <Routes>
        <Route path="/" element={<>AccountsList</>} />
        <Route path="/:id" element={<>Account</>}></Route>
        <Route path="/create-account" element={<>Create</>} />
        <Route path="/edit-account/:id" element={<>Edit/Delete</>} />
      </Routes>
    </Router>
  );
};

export default App;
