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
      // console.log(resp.body);
      dispatch(setCredentials({ ...CurrentUser, user: resp.body }));
    });
  }, []);

  // Catch authSlice state and display user informations
  const CurrentUser = useSelector((state) => state.auth);
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
  const [editUserName, setEditUserName] = useState(CurrentUser.user.userName);
  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  const handleUserInput = (event) => {
    setEditUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateProfile(editUserName);
      if (isSuccess) {
        dispatch(setEditing());
        // console.log(response.data);
        dispatch(updateUsername(editUserName));
      }
    } catch (isError) {
      // console.error("Error: ", error);
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
