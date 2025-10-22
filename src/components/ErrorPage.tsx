import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-lg text-center p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
        <p className="text-subtle mb-4">{message}</p>
        <Link to="/" className="text-primary underline">Go home</Link>
      </div>
    </div>
  );
}

