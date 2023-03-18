import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import { useNavigate } from "react-router-dom";
function Order(props){

    const [cart, setcart] = useState([])
    const [products, setproducts] = useState([])
    const [comment, setcomment] = useState("")
    const [got_data, setGot_data] = useState(false);
    const navigate = useNavigate();
    const Get_data=()=>{
      var url = "https://simplified-drilling-simulator.onrender.com/carts/current?user_id="+props.user_id 
        fetch(url,{}).then(function(res){ 
                console.log(res.status);
                console.log(res);
                res.json().then(data=>({
                    data: data,
                    stat: res.status
                })).then(res=>{
                    console.log(res.stat, res.data)
                    var str = JSON.stringify(res.data);
                    var pars = JSON.parse(str)
                    setcart(res.data[0]);
                    setproducts(res.data[1]);
                    })
                })
                .catch(function(res){ console.log(res) })
    }

    // const Add_to_cart=(e)=>{
    //   e.preventDefault()
    //   console.log(e.target.value);
    //   fetch("http://localhost:3000/carts/new?user_id="+props.user_id+"&product_id="+e.target.value,{}).then(function(res){ 
    //     console.log(res.status);
    //     console.log(res);
    //     res.json().then(data=>({
    //         data: data,
    //         stat: res.status
    //     })).then(res=>{
    //         console.log(res.stat, res.data);
    //         var str = JSON.stringify(res.data);
    //         var pars = JSON.parse(str);
    //         setcart(res.data[0]);
    //         alert("Quantity Increased");
    //         })
    //     })
    //     .catch(function(res){ console.log(res) })
    // }

    // const remove_from_cart =(e)=>{
    //   e.preventDefault()
    //   console.log(e.target.value);
    //   fetch("http://localhost:3000/carts/edit?user_id="+props.user_id+"&product_id="+e.target.value,{}).then(function(res){ 
    //     console.log(res.status);
    //     console.log(res);
    //     res.json().then(data=>({
    //         data: data,
    //         stat: res.status
    //     })).then(res=>{
    //         console.log(res.stat, res.data);
    //         var str = JSON.stringify(res.data);
    //         var pars = JSON.parse(str);
    //         setcart(res.data[0]);
    //         setproducts(res.data[1]);
    //         alert("Quantity Decreased");
    //         })
    //     })
    //     .catch(function(res){ console.log(res) })
    // }

    const changeComment =(e)=>{
      setcomment(e.target.value)
    }


    const mark_complete=(e)=>{
      e.preventDefault()
      console.log(e.target.value);
      fetch("https://simplified-drilling-simulator.onrender.com/orders/mark_complete/"+e.target.value,{
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
                    method: "GET"
                    // body: JSON.stringify({email: mail, password: password})
            }).then(function(res){ 
                    console.log(res.status);
                    res.json().then(data=>({
                        data: data,
                        stat: res.status
                    })).then(res=>{
                        console.log(res.stat, res.data)
                        if(res.data){
                          console.log(res.data)
                            // localStorage.setItem('user', JSON.stringify(res.data));
                            // localStorage.setItem('id', JSON.stringify(res.data.id));
                            // localStorage.setItem('role', JSON.stringify(res.data.role));
                            // props.setuserid(res.data.id)
                            // props.setrole(res.data.role)
                            // alert("Order Created");
                            setcart(res.data);

                            // navigate('/main');
                        }
                        })
                    })
                    .catch(function(res){ console.log(res) })
    }

    useEffect(() => {
        if(!got_data && props.user_id){
            setGot_data(true);
            Get_data();
        }
        
      },[got_data, props.user_id]);
    

    //   create table body of all the table



      if(cart.length){
        var new_cart = cart;
        var names_and_quantity = []
        new_cart.forEach((order)=>{
            console.log(order.products);
            var names = [];
            order.products.forEach((id,i)=>{
                products.forEach((product)=>{
                    if(product.id == id){
                        names.push(product.name+ " ("+order.quantity[i]+") ")
                    }
                })
            })
            names_and_quantity.push(names);
            // console.log(names)
            // order.products = names
            console.log(names_and_quantity)
        })
        console.log(new_cart)
        var table_body =[];
        new_cart.map((order,i)=>{ 
          table_body.push(
          <tbody key={order.id}>
              <td>{names_and_quantity[i]} </td>
              <td>{order.comment}</td>
              <td>{order.status}</td>
              <td>{order.table}</td>
              {/* {props.role && props.role.includes("employee") && <td> <button value={order.id} onClick={(e)=>mark_complete(e)} className='btn'>Mark Complete</button></td>} */}
              {props.role && props.role.includes("employee") && <td> <button value={order.id} onClick={(e)=>mark_complete(e)} className='btn'>Mark Complete</button></td>}
              {/* <td> <button className='btn btn-primary' value={product.id} onClick={(e)=>Add_to_cart(e)} >+</button></td> */}
              {/* <td>{cart.quantity[cart.products.indexOf(product.id)]}</td> */}
              {/* <td> <button className='btn btn-primary' value={product.id} onClick={(e)=>remove_from_cart(e)} >-</button></td> */}
          </tbody>)
      })

    }


    return    (
        <div class="container">
            <br />
          <div class="row text-center text-primary">
            <h2>Current Orders</h2>
            </div>
            <table className="container">
                <thead className="text-center">
                    <th className="col-md-2">Products</th>
                    <th className="col-md-2">Comments</th>
                    <th className="col-md-2">status</th>
                    <th className="col-md-2">Table</th>
                     {props.role && props.role.includes("employee") && <th className="col-md-2">Action</th>}

                </thead>
                {table_body && table_body}
            </table>
         </div>
    )
}

export default Order;

