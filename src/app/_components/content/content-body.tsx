type ContentBodyProps = {
  htmlContent: string;
};

export async function ContentBody({ htmlContent }: ContentBodyProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <article
        className="prose prose-lg lg:prose-2xl dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
