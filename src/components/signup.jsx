import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://mb-backend-37on.onrender.com/Signup", { name, email, password })
      .then((result) => {
        alert("SignUp successfully , redirected to login ");
        history("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="">
      <div className="d-flex flex-column align-items-center justify-content-center px-4 py-5 mx-auto">
        <div className="w-100 rounded-lg shadow-sm border-gray-300">
          <div className="p-4 space-y-4 md:space-y-6">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-500 md:text-xl">
              Create an account
            </h1> 
            <form  className="space-y-4 md:space-y-6" >
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your name</label>
                <input onChange={(e) => setName(e.target.value)}  type="text" name="name" id="name" className="form-control" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Your email</label>
                <input    onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="name@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input    onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="form-control" required />
              </div>
             
              <Link type="submit" onClick={handleSubmit} className="btn btn-primary w-100 mt-2 mb-2">Sign up</Link>
              <p className="text-sm font-light ">
                Already have an account? <Link to={'/'} className="font-medium text-primary-600 hover-underline">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
