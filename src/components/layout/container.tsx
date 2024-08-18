type ContainerProps = {
  children?: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="container max-w-7xl mx-auto px-4 md:px-6">{children}</div>
  );
}
