import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TvEdit = () => {
    const { tvid } = useParams();
    const [id, idChange] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [resolution, setResolution] = useState("");
    const [price, setPrice] = useState("");
    const [brandError, setBrandError] = useState("");
    const [modelError, setModelError] = useState("");
    const [resolutionError, setResolutionError] = useState("");
    const [priceError, setPriceError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        setBrandError("");
        setModelError("");
        setResolutionError("");
        setPriceError("");

        let isValid = true;


        if (brand.trim() === "") {
            setBrandError("Brand is required");
            isValid = false;
        }

        if (model.trim() === "") {
            setModelError("Model is required");
            isValid = false;
        }


        const parsedResolution = parseFloat(resolution);
        if (isNaN(parsedResolution) || parsedResolution <= 0) {
            setResolutionError("Resolution must be a positive number");
            isValid = false;
        }


        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setPriceError("Price must be a positive number");
            isValid = false;
        }

        if (isValid) {
            const tvData = { id, brand, model, resolution, price };

            fetch("http://localhost:8050/tv/" + tvid, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(tvData),
            })
                .then((res) => {
                    alert('Change successful');
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8050/tv/" + tvid)
            .then((res) => res.json())
            .then((resp) => {
                idChange(resp.id);
                setBrand(resp.brand);
                setModel(resp.model);
                setResolution(resp.resolution);
                setPrice(resp.price);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [tvid]);

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
                                            <input
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            <span className="text-danger">{brandError}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Model</label>
                                            <input
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            <span className="text-danger">{modelError}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Resolution</label>
                                            <input
                                                value={resolution}
                                                onChange={(e) => setResolution(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            <span className="text-danger">{resolutionError}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            <span className="text-danger">{priceError}</span>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">
                                                Save
                                            </button>
                                            <Link to="/" className="btn btn-danger">
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TvEdit;
