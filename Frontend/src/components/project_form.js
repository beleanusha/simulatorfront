import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ProjectForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handle_cancel = (event) => {
    props.close_form(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to handle form submission goes here
    console.log('Title:', title);
    console.log('Description:', description);
    var headers = new Headers();
    var  token = localStorage.getItem('token') != null ?  JSON.parse(localStorage.getItem('token')).token : null
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
            }
    fetch("https://simplified-drilling-simulator.onrender.com/projects/create",{
            headers: headers,
                method: "POST",
                body: JSON.stringify({title: title, description: description})
        }).then(function(res){ 
                console.log(res.status);
                res.json().then(data=>({
                    data: data,
                    stat: res.status
                })).then(res=>{
                    console.log(res.stat, res.data)

                    // seterr([res.data.user]);
                    if(res.stat === 200){
                      toast.success(res.data.result);
                      props.close_form(false);
                    }
                    else{
                      console.log(res.data.error);
                      toast.error(res.data.error);
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
                <h1>Create a New Project</h1>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={handleDescriptionChange} />

                <button type="submit">Save</button>
                </form>
            </div>
        </div>
  );
}

export default ProjectForm;
