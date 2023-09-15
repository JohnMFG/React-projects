import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const[id,idChange] = useState("");
    const[name,nameChange] = useState("");
    const[email,emailChange] = useState("");
    const[phone,phoneChange] = useState("");
    const[active,activeChange] = useState(true);
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const empData={id, name, email, phone, active};

        fetch("http://localhost:8050/employee/"+empid,
        {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empData)
        }).then((res)=> {
            alert('Change successfull')
            navigate('/')
        }).catch((err)=> {
            console.log(err.message)
        })
    }

    const{empid}=useParams();
    const[empData, empDataChange]=useState({});

    useEffect(()=> {
        fetch("http://localhost:8050/employee/"+empid).then((res)=> {
            return res.json();
        }).then((resp)=>{
            idChange(resp.id);
            nameChange(resp.name);
            emailChange(resp.email);
            phoneChange(resp.phone);
            activeChange(resp.active);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[]);
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleSubmit} className="container">
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit Employee</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        {/* <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div> */}
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input required value={email} onChange={e=>emailChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={e=>phoneChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-check">
                                            <input checked={active} onChange={e=>activeChange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                                <label className="form-check-label"> Active</label>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmpEdit;