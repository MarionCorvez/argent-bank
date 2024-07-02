import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setEditing } from "@users/authSlice";
import {
  useGetProfileMutation,
  useUpdateProfileMutation,
} from "@users/authApiSlice";

export default function Account() {
  const dispatch = useDispatch();

  // Catch authSlice state
  const CurrentUser = useSelector((state) => state.auth);

  const token = CurrentUser.token;
  console.log("token:", token);
  const isLoggedIn = CurrentUser.isLoggedIn;
  console.log("isLoggedIn:", isLoggedIn);

  // Display edit section
  const isEditing = CurrentUser.isEditing;
  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(setEditing());
  };

  // Get profile informations
  const [profile, { isLoading }] = useGetProfileMutation();
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

  // Display user informations
  const userName = CurrentUser.user.userName;
  const firstName = CurrentUser.user.firstName;
  const lastName = CurrentUser.user.lastName;
  // Display first + lastname according to design/user.html
  const welcome = CurrentUser.user ? firstName + " " + lastName + "!" : "";

  // Manage edit username

  //const [username, setUsername] = useState(CurrentUser.user.userName);
  // const [username, setUsername] = useState("");

  const handleUserInput = (event) => {
    event.preventDefault();
    // username(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setEditing());
  };

  // Edit username
  /*   const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();
  const [username, setUsername] = useState(CurrentUser.user.userName);
  const onUsernameChanged = (e) => setUsername(e.target.value);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateProfile({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  }; */

  /*   const [setUserName] = useUpdateProfileMutation();
  useEffect(() => {
    const putNewUsername = async () => {
      const DataUsername = await newUsername().unwrap();
      return DataUsername;
    };
    putNewUsername().then((resp) => {
      console.log(resp.body);
      dispatch(setCredentials({ ...CurrentUser, user: resp.body }));
    });
  }, []); */

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
              value={userName}
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
          <p>An error occurred. Please try it again.</p>
        </form>
      </section>
    </>
  );

  return content;
}
