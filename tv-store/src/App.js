
//npm start
//Create routing - npm install react-router-dom
//For basic design - npm install bootstrap
//For json server - npm install -g json-server
// To avoid policies issues - powershell -ExecutionPolicy Bypass -Command "json-server --watch db.json --port 8050"
//Start/create json server (API) - json-server --watch db.json --port 8050

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpListing from './component/EmpListing';
import EmpCreate from './component/EmpCreate';
import EmpInfo from './component/EmpInfo';
import EmpEdit from './component/EmpEdit';

function App() {
  return (
    <div className="App">
      <h1>React CRUD</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>
          <Route path='/employee/info/:empid' element={<EmpInfo />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
