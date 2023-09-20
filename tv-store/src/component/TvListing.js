/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TvListing = () => {
    const[TvData,TvDataChange] = useState(null);
    const navigate=useNavigate();

    const LoadInfo=(id)=>{
        navigate("/tv/info/"+id);
    }
    const LoadEdit=(id)=>{
        navigate("/tv/edit/"+id);
    }
    const LoadRemove=(id)=>{
        if(window.confirm('Confirm deletion')){
            fetch("http://localhost:8050/tv/"+id,
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
        fetch("http://localhost:8050/tv").then((res)=> {
            return res.json();
        }).then((resp)=>{
            TvDataChange(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Tv Listing</h2>
                </div>
                <div className=" card-body">
                    <div>
                        <Link to="tv/create" className="btn btn-success">Add new</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Brand</td>
                                <td>Model</td>
                                <td>Resoliution</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {   TvData &&
                                TvData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.resolution}</td>
                                        <td>{item.price}</td>
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

export default TvListing;