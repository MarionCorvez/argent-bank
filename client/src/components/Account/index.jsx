import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsEditing,
  setEditing,
} from "@users/authSlice";
import { useGetProfileMutation } from "@users/authApiSlice";

export default function Account() {
  // Catch authSlice state
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const token = useSelector(selectCurrentToken);
  console.log(token);

  // Display edit section
  const isEditing = useSelector(selectIsEditing);
  const dispatch = useDispatch();
  function handleEdit() {
    dispatch(setEditing());
  }
  /*   function handleCancel() {
    dispatch(setEditing());
  }
 */

  // Cancel non fonctionnel
  const handleCancel = () => {
    dispatch(setEditing());
  };

  const [profile, { isLoading }] = useGetProfileMutation();

  const welcome = user ? `Welcome ${user} ${profile}!` : "Welcome!";

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setEditing());
  };

  // Manage edit username
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  return (
    <>
      <section className={`header ${isEditing ? "is-hidden" : ""}`}>
        <h1 className="header-title">
          Welcome back
          <br />
          {welcome}! {token}
        </h1>
        <button className="edit-button" onClick={handleEdit}>
          Edit Name
        </button>
      </section>
      <section
        className={`header edit-user ${isEditing ? "is-visible" : "is-hidden"}`}
      >
        <h2 className="header-title">Edit user info</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-wrapper">
            <label htmlFor="username">User name:</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
            />
          </div>
          <div className="edit-wrapper">
            <label htmlFor="username">First name:</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              disabled
            />
          </div>
          <div className="edit-wrapper">
            <label htmlFor="username">Last name:</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              disabled
            />
          </div>
          <button className="edit-button" type="submit">
            Save
          </button>
          <button className="edit-button" onClick={handleCancel}>
            Cancel
          </button>
          <p>An error occurred. Please try it again.</p>
        </form>
      </section>
    </>
  );
}
