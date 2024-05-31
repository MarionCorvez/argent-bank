import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "@/router";
import Header from "@partials/Header";
import Footer from "@partials/Footer";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Header />
        <Router />
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
