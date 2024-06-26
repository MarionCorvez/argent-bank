import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "@users/authSlice";
import { useLoginMutation } from "@users/authApiSlice";

export default function SignIn() {
  // To have focus on the form
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // Optional: set focus on userRef when the component is loaded
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Optional: set error message back to empty when there is focus again
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // Manage form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      console.log("OK", userData);
      // saving username and get an access token
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("Please check your informations.");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={emailRef}
          value={email}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
      <p
        ref={errRef}
        className={
          errMsg ? "sign-in-error is-visible" : "sign-in-error is-hidden"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
    </form>
  );

  return content;
}
