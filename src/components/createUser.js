import React, { useState } from "react";
import Navbar from './navbar';
import { useNavigate, useLocation } from "react-router-dom";

const CreateUser = () => {
    const BASE_URL = "http://localhost:7020/api";
    const abortController = new AbortController();
    const [data, setData] = useState({
        email: "",
        role: "USER"
    });
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const userToken = localStorage.getItem("token");
    const location = useLocation();
    let user = location.state;

    const navigate = useNavigate();

    const prevPage = () => {
        navigate("/admin/files", {
          state: {
            user
          }
        });
    }

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            const response = await fetch(BASE_URL + "/users/create-account", {
                signal: abortController.signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + userToken,
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.type === "error") {
                setSuccessMsg(null);
                setError(result.message);
            }
            else {
                setSuccessMsg(result.message);
                setError(null);
            }
            setIsPending(false);
        }
        catch (error) {
            setSuccessMsg(null);
            setIsPending(false);
            setError("An error has occured. Please try again later");
        }
    }

    return (
        <div>
            <Navbar email={"Admin: " + user.email} />
            <div className="text-white cursor-pointer ml-5 my-5 p-3 bg-violet-500/60 hover:bg-violet-500 max-w-fit rounded" onClick={prevPage}>
                <p>Back</p>
            </div>
            <div className="flex justify-center">
                <div className="bg-violet-500/60 max-w-fit flex justify-center py-10 mx-10 my-20 rounded-xl">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-10">
                        <h2 className="text-2xl mb-6 text-center">Create Account</h2>
                        {error && <div className="text-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> {error} </div>}
                        {successMsg && <div className="text-center text-sm bg-green-200 text-green-800 my-2 mx-2 px-7 py-5 w-full"> {successMsg} </div>}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                                id="email"
                                type="email"
                                placeholder='Email'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                                name="role"
                                id="role"
                                onChange={handleChange}
                                required
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-violet-500 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {!isPending && <div>Create</div>}
                                {isPending && <div>Creating...</div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;