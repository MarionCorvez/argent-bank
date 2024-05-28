import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import Header from "@partials/Header";
import Footer from "@partials/Footer";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      {useRoutes(routes)}
      <Footer />
    </Suspense>
  );
}

export default App;
