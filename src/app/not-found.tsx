import Link from "next/link";
import { Container } from "@/components/layout/container";

function NotFound() {
  return (
    <Container>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
          404
        </h1>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Page not found
        </h2>
        <p className="max-w-[700px] text-lg text-neutral-700 dark:text-neutral-400 sm:text-xl">
          The requested page could not be found.
        </p>
      </div>
      <div className="">
        <Link href="/">Go to home</Link>
      </div>
    </Container>
  );
}

export default NotFound;
