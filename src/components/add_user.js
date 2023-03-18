import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser(props){
    const navigate = useNavigate();
    const [password, setpassword] = useState("")
    const [mail, setmail] = useState("")
    const [err, seterr] = useState([])

    if(props.user_id){
        navigate('/main');
    }

    const changePassword=(e)=>{
        setpassword(e.target.value);
    }
    const changeMail=(e)=>{
        setmail(e.target.value);
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        let newerr = []
        if(!mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            newerr.push("Valid Mail is required. \n")
        }
        console.log(newerr)
        if(newerr.length<1){
            console.log("Request made");
            fetch("https://simplified-drilling-simulator.onrender.com/users/login",{
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({email: mail, password: password})
            }).then(function(res){ 
                    console.log(res.status);
                    console.log(res)
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        if(res.stat === 200){
                            localStorage.setItem('token', JSON.stringify(res.data));
                            props.setuserid(JSON.stringify(res.data))
                            toast.success('Login Successfull');
                            navigate('/main');
                        }
                        else{
                            console.log("hehte")
                            console.log(res.data)
                            toast.error( JSON.stringify(res.data.error));
                        }
                        })
                    })
                    .catch(function(res){ console.log(res) })

        console.log(mail,password);
        }
        else{
            seterr(newerr);
        }
    }

    return <div className="container">
                <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6 col-lg-4">
                    <div className=""> 
                        <form id="basic-form" onSubmit={handlesubmit} class="box card"> 
                            <h1 className="text-primary">Login</h1> 
                            <p className="text-muted"> Please enter User Details</p>
                            <input type="email" id="email" name="" placeholder="Email" value={mail} onChange={(e)=>{changeMail(e)}} />
                            <input type="password" id="password" name="" placeholder="Password" value={password} onChange={(e)=>{changePassword(e)}} />
                            <input type="submit" name="" value="Submit" href="#" /> 
                            <div className="col-md-12">
                            </div>
                        </form>
                    </div>
                </div>   
                <div className="col-md-4">
                    {err.length > 0 && <form id="error-form" onSubmit={handlesubmit} class="box"> 
                       {err}
                    </form>}
                </div>
            </div>
            </div>



}

export default AddUser;