import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

export default function Router() {
  return <>{useRoutes(routes)}</>;
}
