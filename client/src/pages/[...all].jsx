import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <main className="main bg-dark header section-error">
        <section className="error">
          <h1>Page not found</h1>
          <p>We are sorry. The page you searched for does not exist.</p>
          <p>
            <Link to="/" className="main-nav-item">
              Go back to homepage
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
