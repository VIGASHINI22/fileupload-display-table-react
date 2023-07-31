import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Upload from './Upload';
import Edit from './Edit';

const App = () => {
  return (
    
      <Routes>
        <Route path="/"  element={<Upload />}> </Route>
        <Route path="/edit" element={<Edit />}>  </Route>
      </Routes>
   
  );
};

export default App;
