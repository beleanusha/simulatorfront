import React, { useState } from 'react';
import { toast } from 'react-toastify';

function AddToProjectForm(props) {
  const [title, setTitle] = useState('');
  const [email, setemail] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setemail(event.target.value);
  };

  const handle_cancel = (event) => {
    props.close_form(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to handle form submission goes here
    console.log('Title:', title);
    console.log('Description:', email);
    var headers = new Headers();
    var  token = localStorage.getItem('token') != null ?  JSON.parse(localStorage.getItem('token')).token : null
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
            }
    fetch("https://simplified-drilling-simulator.onrender.com/projects/add_to_project",{
            headers: headers,
                method: "POST",
                body: JSON.stringify({title: title, email: email})
        }).then(function(res){ 
                console.log(res.status);
                res.json().then(data=>({
                    data: data,
                    stat: res.status
                })).then(res=>{
                    console.log(res.stat, res.data)
                    console.log("here")
                    if(res.stat === 200){
                        toast.success(res.data.message);
                        props.close_form(false);
                    }
                    // seterr([res.data.user]);
                    else{
                        console.log(res.data.error)
                        toast.error(res.data.error);
                        props.close_form(false);
                    }
                    })
                })
                .catch(function(res){ console.log(res) })
  };

  return (
        <div className="page-container">
            <div className="form-container">
                <button onClick={(e)=>handle_cancel(e)} className='btn btn-danger'>X</button>
                <form onSubmit={handleSubmit}>
                <h1>Add User To Project</h1>
                <label htmlFor="title">Project Title:</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="description">User Email:</label>
                <textarea id="description" value={email} onChange={handleDescriptionChange} />

                <button type="submit">Save</button>
                </form>
            </div>
        </div>
  );
}

export default AddToProjectForm;
