import React from 'react';
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [values, setValues] = React.useState({
        emai: '',
        password: ''
    })

    const navigation = useNavigate();
    axios.defaults.withCredentials = true;

    const [errors, setErrors] = React.useState('')
 
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://172.31.68.213:3001/login', values)
            .then(res => {
                if (res.data.status === 'ok') {
                   navigation('/');
                } else {
                    setErrors(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage '>
        <div className=' p-3 rounded  w-25 border shadow loginForm' >
            <div className='text-danger'>
                <strong>{errors && errors}</strong>
                
            </div>
            
            <h2 style={{color: 'white'}} >Login</h2>
            <form onSubmit={handleSubmit} >
                <div className='mb-3'>
                    <label htmlFor="email" style={{color: 'white'}} ><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' 
                       onChange={ e =>setValues({...values, email: e.target.value})}
                       className='form-control rounded-0' autoComplete='off'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"style={{color: 'white'}} ><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                       onChange={ e =>setValues({...values, password: e.target.value})}
                       className='form-control rounded-0' />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                
            </form>
        </div>
    </div>
    );
}

export default Login;