import './App.css';
import NavbarMain from './components/navbar';
import AddUser from './components/add_user'
import MainPage from './components/main_page'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import NewUser from './components/signup';
import ProjectShow from './components/project_show';
import { ToastContainer } from  'react-toastify';

function App() {
  const [user_id, setuserid] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    var uid = localStorage.getItem('token');
    console.log(uid);
    if(!user_id){
      setuserid(uid);
    }
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <BrowserRouter>
        <NavbarMain user_id = {user_id} setuserid = {setuserid} role = {role} setrole = {setrole} />
        <Routes>
          <Route exact path='/' element={<AddUser user_id = {user_id} setuserid = {setuserid} role = {role} setrole = {setrole} />} > </Route>
          <Route exact path='/main'  element={<MainPage />} > </Route>
          <Route exact path='/signup'   element={<NewUser user_id = {user_id} role = {role}/>} > </Route>
          <Route path='/project/:id'   element={ <ProjectShow /> } > </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
