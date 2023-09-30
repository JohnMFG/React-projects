
//npm start
//Create routing - npm install react-router-dom
//For basic design - npm install bootstrap
//For json server - npm install -g json-server
// To avoid policies issues - powershell -ExecutionPolicy Bypass -Command "json-server --watch db.json --port 8050"
//Start/create json server (API) - json-server --watch db.json --port 8050


import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TvListing from './component/TvListing';
import TvCreate from './component/TvCreate';
import TvInfo from './component/TvInfo';
import TvEdit from './component/TvEdit';
import RpcTest from './component/RpcTest';
import { DataProvider } from './context/DataContext';
   
function App() {   
  return (
    <div className="App">
      <h1>React CRUD</h1>
      <BrowserRouter>
      <DataProvider>
          <Routes>
            <Route path="/" element={<TvListing />} />
            <Route path="/tv/create" element={<TvCreate />} />
            <Route path="/tv/info/:tvid" element={<TvInfo />} />
            <Route path="/tv/edit/:tvid" element={<TvEdit />} />
            <Route path="/rpc" element={<RpcTest />} />
          </Routes>
          </DataProvider> 
      </BrowserRouter>
    </div>
  );
}

export default App;


