import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          navigate("/tasks");
        } else if (result.data === "incorrect details") {
          alert("Incorrect details. Please try again.");
        } else {
          alert("No data found. Please Sign Up.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="">
      <div className="d-flex flex-column align-items-center justify-content-center px-4 py-5 mx-auto">
        <div className="w-100 rounded-lg shadow-sm border-gray-300">
          <div className="p-4 space-y-4 md:space-y-6">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-500 md:text-xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Your email</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="name@company.com" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="form-control" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2 mb-2">Sign in</button>
              <p className="text-sm font-light">
                Don’t have an account yet? <Link to={'/Signup'} className="font-medium text-primary-600 hover-underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
