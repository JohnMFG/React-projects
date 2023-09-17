
//npm start
//Create routing - npm install react-router-dom
//For basic design - npm install bootstrap
//For json server - npm install -g json-server
// To avoid policies issues - powershell -ExecutionPolicy Bypass -Command "json-server --watch db.json --port 8050"
//Start/create json server (API) - json-server --watch db.json --port 8050

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpListing from './component/TvListing';
import EmpCreate from './component/TvCreate';
import EmpInfo from './component/TvInfo';
import EmpEdit from './component/TvEdit';

function App() {
  return (
    <div className="App">
      <h1>React CRUD</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/tv/create' element={<EmpCreate />}></Route>
          <Route path='/tv/info/:tvid' element={<EmpInfo />}></Route>
          <Route path='/tv/edit/:tvid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
