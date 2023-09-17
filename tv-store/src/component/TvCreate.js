import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TvCreate = () => {

    const[brand,brandChange] = useState("");
    const[model,modelChange] = useState("");
    const[resoliution,resoliutionChange] = useState("");
    const[price,priceChange] = useState("");
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const tvData={brand, model, resoliution, price};

        fetch("http://localhost:8050/tv",
        {
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(tvData)
        }).then((res)=> {
            alert('Added successfully')
            navigate('/')
        }).catch((err)=> {
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleSubmit} className="container">
                        <div className="card">
                            <div className="card-title">
                                <h2>Add TV</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={brand} onChange={e=>brandChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Model</label>
                                            <input required value={model} onChange={e=>modelChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Resoliution</label>
                                            <input value={resoliution} onChange={e=>resoliutionChange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input value={price} onChange={e=>priceChange(e.target.value)} className="form-control"></input>
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

export default TvCreate;