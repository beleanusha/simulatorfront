import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function NavbarMain(props) {
  const navigate = useNavigate();
  const logout = ()=>{
    if (props.user_id){
      props.setuserid(null)
      localStorage.removeItem('token');
      toast.success('Logged out successfully')
      navigate('/');
    }
  }
    return  (

        <Navbar className='row navbar navbar-light bg-primary justify-content-between'>
          <Container className='' >
            {!props.user_id && <Link to='/' className=''>
                <button className='btn btn-primary m-2 p-1 col-sm-2 col-md-1'>Login</button>
            </Link>}
            {!props.user_id && <Link to='/signup' className=''>
                <button className=' btn btn-primary m-2 p-1 col-sm-2 col-md-1'>Signup</button>
            </Link>}
            <Link to='/main' className=''>
                <button className='btn btn-primary m-2 p-1 col-sm-2 col-md-1'>Home</button>
            </Link>
       
      
            <Navbar.Collapse className="justify-content-center col-sm-2">
              <Navbar.Text>
                <h1 className='text-light'>Simplified Drilling Simulator</h1>
              </Navbar.Text>
            </Navbar.Collapse>
            <div className=''>
                {props.user_id && <button className='btn btn-primary m-2 p-1 col-sm-2 col-md-1' onClick={logout} >Logout</button>}
            </div>
          </Container>
        </Navbar>
      );
    
}

export default NavbarMain;
