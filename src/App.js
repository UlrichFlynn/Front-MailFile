import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import DownloadFile from './components/downloadFile';
import PageNotFound from './components/PageNotFound';
import FileList from './components/fileList';
import CreateUser from './components/createUser';

function App() {
  // const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path= "/login" exact element={ <Login /> } />
      <Route path= "/" exact element={ <Navigate replace to="/login" /> } />
      <Route path= "/home" exact element={ <Home /> } />
      <Route path= "/download/:id" exact element={ <DownloadFile /> } />
      <Route path= "/admin/files" exact element={ <FileList /> } />
      <Route path= "/users/new" exact element={ <CreateUser /> } />
      <Route path= "*" exact element={ <PageNotFound /> } />
    </Routes>
  );
}

export default App;