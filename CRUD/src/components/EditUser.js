import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}`).then(function (response) {
            console.log(response.data);

            if (response.data.status === 1) {
                setInputs(response.data.user);
            } else {
                console.error("Failed to fetch user data.");
            }
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
            setIsSaving(true);
            setErrorMessage(null);

            axios
                .put(`http://localhost:80/api/user/${id}/edit`, { id, user: inputs })
                .then(function (response) {
                    console.log(response.data);
                    navigate('/');
                })
                .catch(function (error) {
                    console.error("Server Error:", error.response ? error.response.data : error.message);

                    setErrorMessage(error.response ? error.response.data.message : error.message);

                    setIsSaving(false);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                )}
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
                                    value={inputs.name || ""}
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
                                    value={inputs.email || ""}
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Status: </label>
                            </th>
                            <td>
                                <select
                                    name="status"
                                    value={inputs.status || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input
                                    value={inputs.mobile || ""}
                                    type="text"
                                    name="mobile"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button className="btn btn-primary" disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
