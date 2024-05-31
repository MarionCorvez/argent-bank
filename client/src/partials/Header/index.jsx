import { NavLink } from "react-router-dom";
import argentBankLogo from "@img/argentbanklogo.webp";
import Nav from "@components/Nav";

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
          <Nav />
        </nav>
      </header>
    </>
  );
}
