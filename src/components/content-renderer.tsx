import React from "react";
import ContactForm from "./shortcodes/contact-form";
import Gallery from "./shortcodes/gallery";

const componentMap: { [key: string]: React.ComponentType<any> } = {
  "contact-form": ContactForm,
  gallery: Gallery,
};

interface ContentChunk {
  type: "text" | "component" | "gallery";
  content: string;
}

interface ContentRendererProps {
  htmlContent: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ htmlContent }) => {
  if (!htmlContent) return null;

  const chunks = parseContent(htmlContent);

  return <div>{chunks.map((chunk, index) => renderChunk(chunk, index))}</div>;
};

function parseContent(content: string): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  const parts = content.split(/(\[(?:component:|\/?\w+)[^\]]*\])/);

  let isInGallery = false;
  let galleryContent = "";

  for (const part of parts) {
    if (isInGallery) {
      if (part === "[/gallery]") {
        chunks.push({ type: "gallery", content: galleryContent.trim() });
        isInGallery = false;
        galleryContent = "";
      } else {
        galleryContent += part;
      }
    } else {
      const componentMatch = part.match(/^\[component:([^\]]+)\]$/);
      if (componentMatch) {
        chunks.push({ type: "component", content: componentMatch[1] });
      } else if (part === "[gallery]") {
        isInGallery = true;
      } else if (part.trim()) {
        chunks.push({ type: "text", content: part });
      }
    }
  }

  return chunks;
}

function renderChunk(chunk: ContentChunk, index: number): React.ReactNode {
  switch (chunk.type) {
    case "text":
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: chunk.content }} />
      );
    case "component":
      const Component = componentMap[chunk.content];
      return Component ? <Component key={index} /> : null;
    case "gallery":
      return <Gallery key={index} content={chunk.content} />;
    default:
      return null;
  }
}

export default ContentRenderer;
