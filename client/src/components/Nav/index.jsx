import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@users/authSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Catch authSlice state
  const CurrentUser = useSelector((state) => state.auth);
  const userName = CurrentUser.user.userName;
  const isLoggedIn = CurrentUser.isLoggedIn;

  // Manage logout
  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  const content = (
    <>
      {!isLoggedIn ? (
        <div>
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      ) : (
        <div className="main-nav-wrapper">
          <NavLink to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {userName}
          </NavLink>
          <div onClick={handleLogOut} className="main-nav-item pointer">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </div>
        </div>
      )}
    </>
  );

  return content;
}
