
//npm start
//Create routing - npm install react-router-dom
//For basic design - npm install bootstrap
//For json server - npm install -g json-server
// To avoid policies issues - powershell -ExecutionPolicy Bypass -Command "json-server --watch db.json --port 8050"
//Start/create json server (API) - json-server --watch db.json --port 8050
//For DI and IOC - npm install inversify inversify-react reflect-metadata

//npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

//Axios - npm install axios
//For babel - npm install --save-dev babel-jest
//npm install --save-dev @babel/core @babel/preset-env

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ContainerProvider } from 'inversify-react'; // Import ContainerProvider
// import container from './container'; // Import your DI container
import TvListing from './component/TvListing';
import TvCreate from './component/TvCreate';
import TvInfo from './component/TvInfo';
import TvEdit from './component/TvEdit';
   
function App() {   
  return (
    <div className="App">
      <h1>React CRUD</h1>
      <BrowserRouter>
        {/* <ContainerProvider container={container}> */}
          <Routes>
            <Route path="/" element={<TvListing />} />
            <Route path="/tv/create" element={<TvCreate />} />
            <Route path="/tv/info/:tvid" element={<TvInfo />} />
            <Route path="/tv/edit/:tvid" element={<TvEdit />} />
          </Routes> 
        {/* </ContainerProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;


