import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setRemember } from "@users/authSlice";
import { useLoginMutation } from "@users/authApiSlice";

export default function SignIn() {
  // To have focus on the form
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // Catch authSlice state
  const CurrentUser = useSelector((state) => state.auth);

  // Manage remember options
  const isRemembered = CurrentUser.isRemembered;
  const handleRememberMe = () => {
    dispatch(setRemember());
  };
  // console.log("isRemembered:", isRemembered);

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
      // console.log("userData.body", userData.body);

      if (userData) {
        const { token } = userData.body;
        if (!isRemembered) {
          window.sessionStorage.setItem("token", token);
        } else {
          window.localStorage.setItem("token", token);
        }
      }
      // saving username and get an access token
      dispatch(setCredentials({ ...CurrentUser, token: userData.body.token }));
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
          defaultValue={email}
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
          defaultValue={password}
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          defaultChecked={false}
          onChange={handleRememberMe}
        />
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
