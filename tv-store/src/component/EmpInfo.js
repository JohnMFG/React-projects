import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpInfo = () => {
    const{empid}=useParams();
    const[empData, empDataChange]=useState({});

    useEffect(()=> {
        fetch("http://localhost:8050/employee/"+empid).then((res)=> {
            return res.json();
        }).then((resp)=>{
            empDataChange(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[empid]);

    return (
        <div>
            {   empData &&
                <div className="container">
                    <h3>Employee name: {empData.name}</h3>
                    <h3>Employee email: {empData.email}</h3>
                    <h3>Employee phone: {empData.phone}</h3>
                    <Link className="btn btn-danger" to="/">GO BACK</Link>
                </div>            
            }
        </div>
    )
}

export default EmpInfo;