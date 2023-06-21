import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Employee from './Employee';
import Home from './Home';
import Profile from './Profile';
import AddEmployee from './AddEmployee';
import EmployeeEdit from './EmployeeEdit';
import Start from './start';
import EmployeeLogin from './EmployeeLogin';
import EmployeeDetail from './EmployeeDetail';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} >
          <Route path="" element={<Home/>}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/create" element={<AddEmployee />}></Route>
          <Route path="/employeeEdit/:id" element={<EmployeeEdit />}></Route>
        
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path='/start' element={<Start/>} />
        <Route path='/employeeLogin' element={<EmployeeLogin />} />
        <Route path='/employeedetail/:id' element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
