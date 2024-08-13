import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function ContentTitle({ children }: Props) {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  );
}
