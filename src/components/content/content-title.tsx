import { ReactNode } from "react";

type ContentTitleProps = {
  children?: ReactNode;
};

export function ContentTitle({ children }: ContentTitleProps) {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  );
}
