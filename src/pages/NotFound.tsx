import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-screen-md px-4 md:px-8 py-16 text-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="text-subtle mt-2">Page not found.</p>
      <Link className="btn btn-primary mt-6" to="/">Go home</Link>
    </div>
  );
}