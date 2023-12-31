import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    console.log(id);
    useEffect(()=> {
     // console.log("token",localStorage.getItem('token'));
      axios.get('http://18.207.158.182:3001/get/'+id)
      .then(res => {
           if(res.data.status === 'ok'){
            setEmployee(res.data.Result[0])
           } else {
             navigate('/start')
           
           }
        })
      .catch(err => console.log(err));
  },[])
    const handleLogout = () => {
		axios.get('http://18.207.158.182:3001/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	} 
  return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://18.207.158.182:3001/images/`+employee.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail