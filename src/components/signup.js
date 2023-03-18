import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function NewUser(props){
    // console.log('You are in reception login page')
    const navigate = useNavigate();
    const [password, setpassword] = useState("")
    const [mail, setmail] = useState("")
    const [confirm, setconfirm] = useState("")
    const [age, setage] = useState()
    const [gender, setgender] = useState()
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
    const changeconfirm=(e)=>{
        setconfirm(e.target.value);
    }
    const changeage=(e)=>{
        setage(e.target.value);
    }

    const changegender=(e)=>{
        setgender(e.target.value);
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        let newerr = []
        if(!mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            newerr.push("Valid Mail is required. \n")
            toast.error("Valid Mail is required. \n")
        }
        if(password != confirm){
            newerr.push("Please enter same password. \n");
            toast.error("Password does not match")
        }
        // if(table >= 100){
        //     newerr.push("Please enter same password. \n");
        //     alert("Please enter table value between 1 to 100")
        // }
        console.log(newerr)
        if(newerr.length<1){
            console.log("Request made");
            fetch("https://simplified-drilling-simulator.onrender.com/users/signup",{
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({email: mail, password: password, age: age, gender: gender})
            }).then(function(res){ 
                    console.log(res.status);
                    console.log("here")
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        // seterr([res.data.user]);
                        if(res.stat === 200){
                            toast.success("User created")
                            navigate('/');
                        }
                        else{
                            toast.error(res.data.error)
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
                            <h1 className="text-primary">Register</h1> 
                            <p className="text-muted"> Please enter User Details</p>
                            <input type="email" id="email" className="my-1" name="" placeholder="Email" value={mail} onChange={(e)=>{changeMail(e)}} />
                            <input type="password" id="password" className="my-1" name="" placeholder="Password" value={password} onChange={(e)=>{changePassword(e)}} />
                            <input type="password" id="confirm" className="my-1" name="" placeholder="Confirm Password" value={confirm} onChange={(e)=>{changeconfirm(e)}} />
                            <input type="number" id="age" className="my-1" name="age" placeholder="Age" value={age} onChange={(e)=>{changeage(e)}} />
                            <select  className="my-1"  id="gender" onChange={(e)=>{changegender(e)}}>  
                                <option>Gender</option>
                                <option key={"male"} value="male">Male</option>
                                <option key={"female"} value="female" >Female</option>
                            </select>
                            <input type="submit" name="" className="my-1" value="Register" href="#" /> 
                            <div className="col-md-12">
                            </div>
                        </form>
                    </div>
                </div>   
                <div className="col-md-4">
                    {/* {err.length > 0 && <form id="error-form" onSubmit={handlesubmit} class="box"> 
                       {err}
                    </form>} */}
                </div>
            </div>
            </div>



}

export default NewUser;