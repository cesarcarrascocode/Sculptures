import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Back to list</Link>
    </>
  );
}
