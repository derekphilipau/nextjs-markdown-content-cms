import React from "react";
import ContactForm from "./shortcodes/contact-form";

const componentMap: { [key: string]: React.ComponentType } = {
  "contact-form": ContactForm,
};

interface ContentRendererProps {
  htmlContent?: string | null;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ htmlContent }) => {
  if (!htmlContent) return null;

  // Split content by shortcodes
  const parts = htmlContent.split(/(\[component:[^\]]+\])/);

  return (
    <div>
      {parts.map((part, index) => {
        const match = part.match(/^\[component:([^\]]+)\]$/);
        if (match) {
          const Component = componentMap[match[1]];
          return Component ? <Component key={index} /> : null;
        }
        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
};

export default ContentRenderer;
