import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setEditing } from "@users/authSlice";
import { useGetProfileMutation } from "@users/authApiSlice";

export default function Account() {
  const dispatch = useDispatch();

  // Catch authSlice state
  const CurrentUser = useSelector((state) => state.auth);

  // Display edit section
  const isEditing = CurrentUser.isEditing;
  console.log("isEditing", isEditing);
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
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setEditing());
  };

  return (
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
}
