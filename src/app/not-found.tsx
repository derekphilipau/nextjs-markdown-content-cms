import Link from "next/link";
import { Container } from "@/components/layout/container";

function NotFound() {
  return (
    <Container>
      <h1 className="h1-header">404</h1>
      <h2 className="h2-header">Page not found</h2>
      <p className="text-xl">The requested page could not be found.</p>
      <p className="text-xl">
        <Link href="/">Go to home</Link>
      </p>
    </Container>
  );
}

export default NotFound;
