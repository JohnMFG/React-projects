
//api folder has to be in xamp, htdocs
//npm install  
//composer install - to install all needed dependencies 
//for test - composer global require phpunit/phpunit


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewUser from './components/ViewUser';
import StreamingApp from './components/StreamingApp';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Users</Link>
            </li>
            <li>
              <Link to="user/create">Create User</Link>
            </li>
            <li>
              <Link to="stream">Streaming API</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
          <Route path="user/:id/view" element={<ViewUser />} />
          <Route path="stream" element={<StreamingApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
