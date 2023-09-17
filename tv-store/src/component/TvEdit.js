import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TvEdit = () => {
    const[id,idChange] = useState("");
    const[brand,brandChange] = useState("");
    const[model,modelChange] = useState("");
    const[resoliution,resoliutionChange] = useState("");
    const[price,priceChange] = useState("");
    //const[active,activeChange] = useState(true);
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const tvData={id, brand, model, resoliution, price};

        fetch("http://localhost:8050/tv/"+tvid,
        {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(tvData)
        }).then((res)=> {
            alert('Change successfull')
            navigate('/')
        }).catch((err)=> {
            console.log(err.message)
        })
    }

    const{tvid}=useParams();

    useEffect(()=> {
        fetch("http://localhost:8050/tv/"+tvid).then((res)=> {
            return res.json();
        }).then((resp)=>{
            idChange(resp.id);
            brandChange(resp.brand);
            modelChange(resp.model);
            resoliutionChange(resp.resoliution);
            priceChange(resp.price);
            //activeChange(resp.active);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[tvid]);
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleSubmit} className="container">
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit Tv</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Brand</label>
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

export default TvEdit;