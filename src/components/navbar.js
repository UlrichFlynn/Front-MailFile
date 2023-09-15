import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ email }) => {
    const BASE_URL = "http://localhost:7020/api";
    const abortController = new AbortController();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async() => {
        try {
          setIsPending(true);
          const response = await fetch(BASE_URL+"/users/auth/logout", {
            signal: abortController.signal,
            method: "POST",
          });
          const result = await response.json();
          if (result.type === "error") {
            setError(result.message);
          }
          else {
            setError(null);
            localStorage.removeItem('token');
            navigate("/login");
          }
          setIsPending(false);
        }
        catch(error) {
          setError("An error has occured. Please try again later");
          setIsPending(false);
        }
    }
    
    const handleLogin = async() => {
      navigate("/login");
    }

    

    return (
        <div>
            <nav className="w-screen bg-gradient-to-tr from-fuchsia-500 to-violet-500 text-white p-10 mb-5 flex relative items-center">
                <h1 className="absolute start-10 font-bold text-2xl">MailFile</h1>
                <div className="absolute end-10 flex">
                  <p className="font-semibold mr-5 mt-2.5"> { email } </p>
                  <button className={`${email ? 'bg-red-500/50 hover:bg-red-500' : 'bg-fuchsia-500/60 hover:bg-fuchsia-600'} p-2 rounded`} onClick={ email ? handleLogout : handleLogin }>
                      { !isPending && email && <div>Logout</div> }
                      { !email && <div>Login</div> }
                      { isPending && <div>Logging out...</div> }
                  </button>
                </div>
            </nav>
            { error && <div className="align-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> { error } </div> }
        </div>
    );
}
 
export default Navbar;