import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const[empData,empDataChange] = useState(null);
    const navigate=useNavigate();

    const LoadInfo=(id)=>{
        navigate("/employee/info/"+id);
    }
    const LoadEdit=(id)=>{
        navigate("/employee/edit/"+id);
    }
    const LoadRemove=(id)=>{
        if(window.confirm('Confirm deletion')){
            fetch("http://localhost:8050/employee/"+id,
        {
            method:"DELETE"
        }).then((res)=> {
            window.location.reload();
        }).catch((err)=> {
            console.log(err.message)
        })
        }
    }


    useEffect(() => {
        fetch("http://localhost:8050/employee").then((res)=> {
            return res.json();
        }).then((resp)=>{
            empDataChange(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div>
                        <Link to="employee/create" className="btn btn-success">Add new</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {   empData &&
                                empData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a onClick={()=>{LoadEdit(item.id)}} className="btn btn-success">Edit</a>
                                            <a onClick={()=>{LoadRemove(item.id)}} className="btn btn-danger">Delete</a>
                                            <a onClick={()=>{LoadInfo(item.id)}} className="btn btn-primary">Info</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;