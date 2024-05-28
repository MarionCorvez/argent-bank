import { NavLink } from "react-router-dom";
import argentBankLogo from "@img/argentbanklogo.webp";

export default function Header() {
  return (
    <>
      <header>
        <nav className="main-nav">
          <NavLink to="/" className="main-nav-logo">
            <img
              className="main-nav-logo-image"
              src={argentBankLogo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <div>
            <NavLink to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}
