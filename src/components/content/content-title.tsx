import { ReactNode } from "react";

type ContentTitleProps = {
  children?: ReactNode;
};

export function ContentTitle({ children }: ContentTitleProps) {
  return <h1 className="h1-header pb-4">{children}</h1>;
}
