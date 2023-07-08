import { useNavigate } from 'react-router-dom';
import { useEffect , React} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios'
function Dashboard() {
    const navigate = useNavigate()
	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://3.238.120.214:3001/dashboard')
        .then(res => {
            if(res.data.status === 'ok') {
                if(res.data.role === 'admin') {
                    navigate('/')
                } else  {
                    const id = res.data.id;
                    navigate('/employeedetail/'+id)
                } 
            
               
            } else {
                navigate('/start')
            
            }  
        })
    },[])

    const handleLogout = () => {
        axios.get('http://172.31.68.213:3001/logout')
        .then(res => {
            if(res.data.status === 'ok') {
                navigate('/start')
            }
        })
        .catch(err => {
            console.log(err)
        
        })
    
    };

  return( 
  <div class="container-fluid">
  <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span class="fs-5 d-none d-sm-inline">Admin Dashboard</span>
              </a>
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li>
                      <Link to='/' data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                      
                  </li>
                  <li>
                      <Link to='/employee' class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Manage Employees</span> </Link>
                  </li>
                  <li class="nav-item">
                      <Link to='/profile' class="nav-link align-middle px-0">
                          <i class="fs-4 bi-person"></i> <span class="ms-1 d-none d-sm-inline">Profile</span>
                      </Link>
                  </li>
                  
                  
                  <li onClick={handleLogout} >
                      <a href="#" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-power"></i> <span class="ms-1 d-none d-sm-inline">Logout</span></a>
                  </li>
                  
                  
              </ul>
              
          </div>
      </div>
      <div class="col py-0 m-0">
          <div className='p-2 d-flex justify-content-center shadow-lg' >
            <h4>Employee Management System</h4>
          </div>
          <Outlet></Outlet>
      </div>
  </div>
</div>
)
}

export default Dashboard;
