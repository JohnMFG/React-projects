import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

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
                .post('http://localhost:80/api/user/save', inputs)
                .then(function (response) {
                    console.log('Response Status Code:', response.status);
                    console.log('Response Data:', response.data);
                    navigate('/');
                })
                .catch(function (error) {
                    console.error("Server Error:", error.response ? error.response.data : error.message);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h1>Create User</h1>
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
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errors.name && <p className="error">{errors.name}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="mobile"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errors.mobile && <p className="error">{errors.mobile}</p>}
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
