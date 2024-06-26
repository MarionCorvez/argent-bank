import Router from "@/Router";
import Header from "@partials/Header";
import Footer from "@partials/Footer";
// import Layout from "./components/Layout";
// import Public from "./components/Public";
// import Login from "./features/auth/Login";
// import Welcome from "./features/auth/Welcome";
//import RequireAuth from "@app/RequireAuth";
// import UsersList from "./features/users/UsersList";
// import Layout from "@partials/layout.jsx";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
