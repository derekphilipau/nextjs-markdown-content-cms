import { Container } from "@/app/_components/layout/container";
import { getDictionary } from "@/app/dictionaries/dictionaries";

export function Footer() {
  const dict = getDictionary();
  return (
    <footer className="border-t border-secondary">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-6 lg:mb-0 lg:pr-4 lg:w-1/2">
            {dict.site.title}
          </h3>
          <p className="text-lg text-center lg:text-left lg:w-1/2">
            {dict.site.tagline}
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2"></div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
