import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const [errors, setErrors] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!inputs.name) {
            newErrors.name = "Name is required";
        }

        if (!inputs.email) {
            newErrors.email = "Email is required";
        }

        if (!inputs.mobile) {
            newErrors.mobile = "Mobile is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateInputs()) {
            axios
                .put(`http://localhost:80/api/user/${id}/edit`, inputs)
                .then(function (response) {
                    console.log(response.data);
                    navigate('/');
                })
                .catch(function (error) {
                    console.error("Server Error:", error.response ? error.response.data : error.message);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input
                                    value={inputs.name}
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input
                                    value={inputs.email}
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input
                                    value={inputs.mobile}
                                    type="text"
                                    name="mobile"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button className="btn btn-primary">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
