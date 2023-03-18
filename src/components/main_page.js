import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddToProjectForm from "./add_to_project";
import ProjectForm from "./project_form";
function MainPage(){
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [role,setrole] = useState("user")
  const [projects, setprojects] = useState([])
  const [new_project_modal, set_new_project_modal] = useState(false)
  const [add_to_project_modal, set_add_to_project_modal] = useState(false)

    const Get_data=()=>{
        var headers = new Headers();
        var  token = localStorage.getItem('token') != null ?  JSON.parse(localStorage.getItem('token')).token : null
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
                }
        fetch("https://simplified-drilling-simulator.onrender.com/projects",{
                headers: headers,
                    method: "POST",
                    // body: JSON.stringify({token: localStorage.getItem('token')})
            }).then(function(res){ 
                    console.log(res.status);
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        setprojects(res.data["projects"])
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

    const view_project=(id)=>{
        console.log(id)
        navigate("/project/"+id)
    }

    const delete_project=(id)=>{
        console.log(id)
        var headers = new Headers();
        var  token = localStorage.getItem('token') != null ?  JSON.parse(localStorage.getItem('token')).token : null
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
                }
        fetch("mongodb+srv://simulator:simulator@atlascluster.lwpjf5v.mongodb.net/digital-twin?retryWrites=true&w=majority/projects/delete",{
                headers: headers,
                    method: "POST",
                    body: JSON.stringify({ id: id})
            }).then(function(res){ 
                    console.log(res.status);
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        // seterr([res.data.user]);
                        if(res.stat === 200){
                            // alert("Not authorized")
                             toast.success("project deleted");
                        }
                        else{
                            toast.error("Cannot delete project")
                        }
                        })
                    })
                    .catch(function(res){ console.log(res) })
    }

    const create_project=()=>{
        console.log("Here I will create a project");
        set_new_project_modal(true);
    }

    const add_user_to_project=()=>{
        console.log("Here I will add user to project");
        set_add_to_project_modal(true);
    }

    useEffect(() => {
        if (localStorage.getItem("token") == null){
            toast.error("Login to continue")
            navigate('/')
        }
        if(count===0){
        Get_data()
        }
        setCount(count + 1);
      },[]);

      console.log(role, projects)

    return    (
        <div class="container">
            <h3 className="p-4 text-primary">Projects</h3>
          <table class="">
            <thead>
                <tr className="table-primary text-center">
                <th scope="col" className="text-left">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((project, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>
                            <button className="btn btn-primary" onClick={(e)=>{view_project(project._id)}}>view</button>
                            {role === "admin" && <button className="btn btn-danger mx-1" onClick={(e)=>{delete_project(project._id)}}>Delete</button>}
                            {role === "admin" && <button className="btn btn-secondary mx-1" onClick={(e)=>{add_user_to_project(project._id)}}>Add User</button>}
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            {role === "admin" &&  <button className="btn btn-primary" onClick={create_project}>New Project</button>}
            {new_project_modal && <ProjectForm  close_form= {set_new_project_modal} /> }
            {add_to_project_modal && < AddToProjectForm  close_form= {set_add_to_project_modal} /> }
         </div>
    )
}

export default MainPage;