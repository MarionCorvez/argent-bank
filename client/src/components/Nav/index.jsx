import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Nav() {
  // const tasks = useSelector((state) => console.log(state));
  const tasks = useSelector((state) => state.user);

  return (
    <>
      <div className="main-nav--log-in">
        <NavLink to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>

      <div className="main-nav--logged-in">
        <NavLink to="/profile" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Tony
        </NavLink>

        <NavLink to="/" className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </>
  );
}
