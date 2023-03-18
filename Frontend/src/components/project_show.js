import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myImage from '../assets/images/line graph.png';
import ProjectParameterForm from "./project_parameters_form";

function ProjectShow(props){
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [role,setrole] = useState("user")
  const [project, setproject] = useState([])
  const id = useParams()

    const Get_data=()=>{
        var headers = new Headers();
        var  token = localStorage.getItem('token') != null ?  JSON.parse(localStorage.getItem('token')).token : null
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
                }
        fetch("https://simplified-drilling-simulator.onrender.com/projects/show",{
                headers: headers,
                    method: "POST",
                    body: {"id": id}
            }).then(function(res){ 
                    console.log(res.status);
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        setproject(res.data["project"])
                        setrole(res.data["role"])
                        // seterr([res.data.user]);
                        if(res.stat === 401){
                            // alert("Not authorized")
                            navigate('/')
                        }
                        })
                    })
                    .catch(function(res){ console.log(res) })
    }

    const delete_project=(id)=>{
        console.log(id)
    }
    
    const add_user_to_project=()=>{
        console.log("Here I will add user to project");
    }

    useEffect(() => {
        if (localStorage.getItem("token") == null){
            navigate('/')
        }
        if(count==0){
        Get_data()
        }
        setCount(count + 1);
      },[]);

      console.log(role, project)

    return    (
        <div class="container">
            <h3 className="p-4 text-primary">Show</h3>
            <h4>Title: <strong> Test </strong></h4>
            <h4>This is a test description. This text is hard coded.</h4>
            <div>
                 <img src={myImage} alt="My Image" />\
            </div>
            <ProjectParameterForm />

         </div>
    )
}

export default ProjectShow;