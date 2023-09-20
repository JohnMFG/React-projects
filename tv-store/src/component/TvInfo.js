import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TvInfo = () => {
    const{tvid}=useParams();
    const[tvData, tvDataChange]=useState({});

    useEffect(()=> {
        fetch("http://localhost:8050/tv/"+tvid).then((res)=> {
            return res.json();
        }).then((resp)=>{
            tvDataChange(resp);
        }).catch((err)=> {
            console.log(err.message);
        })
    },[tvid]);

    return (
        <div>
            {   tvData &&
                <div className="container">
                    <h3>TV brand: {tvData.brand}</h3>
                    <h3>TV email: {tvData.model}</h3>
                    <h3>TV resolution: {tvData.resolution}</h3>
                    <h3>TV price: {tvData.price}</h3>
                    <Link className="btn btn-danger" to="/">GO BACK</Link>
                </div>            
            }
        </div>
    )
}

export default TvInfo;