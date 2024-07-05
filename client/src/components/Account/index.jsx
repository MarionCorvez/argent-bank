import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setEditing, updateUsername } from "@users/authSlice";
import {
  useGetProfileMutation,
  useUpdateProfileMutation,
} from "@users/authApiSlice";

export default function Account() {
  const dispatch = useDispatch();

  // Get profile informations
  const [profile] = useGetProfileMutation();
  useEffect(() => {
    const getProfile = async () => {
      const DataUser = await profile().unwrap();
      return DataUser;
    };
    getProfile().then((resp) => {
      console.log(resp.body);
      dispatch(setCredentials({ ...CurrentUser, user: resp.body }));
    });
  }, []);

  // Catch authSlice state and display user informations
  const CurrentUser = useSelector((state) => state.auth);
  const token = CurrentUser.token;
  // console.log("token:", token);
  // const isLoggedIn = CurrentUser.isLoggedIn;
  // console.log("isLoggedIn:", isLoggedIn);
  const userName = CurrentUser.user.userName;
  const firstName = CurrentUser.user.firstName;
  const lastName = CurrentUser.user.lastName;
  // Display first + lastname according to design/user.html
  const welcome = CurrentUser.user ? firstName + " " + lastName + "!" : "";

  // Display edit section
  const isEditing = CurrentUser.isEditing;
  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(setEditing());
  };

  // Manage error message
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    setErrMsg("");
  }, [userName]);

  // Manage edit username
  const [editUserName, setEditUserName] = useState(userName);

  const handleUserInput = (event) => {
    setEditUserName(event.target.value);
  };

  // Dave Gray's method
  /*   const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      dispatch(setEditing());
      setEditUserName("");
    }
  }, [isSuccess]); */

  // Manage username edit on form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setEditing());
    // Appel RTK ne fonctionne pas
    /*     try {
      const response = await updateProfile({
        userName: editUserName,
      }); */
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: editUserName,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        dispatch(updateUsername(editUserName));
        console.log("Username has been updated with success: ", responseData);
      } else {
        console.error("Error: ", response.statusText);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrMsg("An error occurred. Please try it again.");
    }
  };

  const content = (
    <>
      <section className={`header ${isEditing ? "is-hidden" : ""}`}>
        <h1 className="header-title">
          Welcome back
          <br />
          {welcome}
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
              name="userNameInput"
              defaultValue={userName}
              onChange={handleUserInput}
              autoComplete="off"
            />
          </div>
          <div className="edit-wrapper">
            <label htmlFor="username">First name:</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              autoComplete="off"
              disabled
            />
          </div>
          <div className="edit-wrapper">
            <label htmlFor="username">Last name:</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              autoComplete="off"
              disabled
            />
          </div>
          <button className="edit-button" type="submit">
            Save
          </button>
          <button className="edit-button" onClick={handleEdit}>
            Cancel
          </button>
          <p
            ref={errRef}
            className={errMsg ? "is-visible" : "is-hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </form>
      </section>
    </>
  );

  return content;
}
