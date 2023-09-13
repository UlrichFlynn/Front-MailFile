import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const BASE_URL = "http://localhost:7020/api";
    const abortController = new AbortController();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setIsPending(true);
          const response = await fetch(BASE_URL+"/users/auth/login", {
            signal: abortController.signal,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (result.type === "error") {
            setError(result.message);
          }
          else {
            setData(result);
            setError(null);
            localStorage.setItem("token", result.data.token);
            navigate("/home");
          }
          setIsPending(false);
        }
        catch(error) {
          setError("An error has occured. Please try again later");
          setIsPending(false);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        { error && <div className="align-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> { error } </div> }
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
            value={ data.email }
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
            id="password"
            type="password"
            placeholder='Password'
            name='password'
            value={ data.password }
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-violet-500 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            { !isPending && <div>Log in</div> }
            { isPending && <div>Logging in...</div> }
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;