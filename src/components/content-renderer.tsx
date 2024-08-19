"use client";

import React from "react";
import ContactForm from "./shortcodes/contact-form";
import Gallery from "./shortcodes/gallery";
import type { ContentChunk } from "@/types";

const componentMap: { [key: string]: React.ComponentType<any> } = {
  "contact-form": ContactForm,
  gallery: Gallery,
};

interface ContentRendererProps {
  contentChunks: ContentChunk[];
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ contentChunks }) => {
  if (!contentChunks || contentChunks.length === 0) return null;

  return (
    <div>{contentChunks.map((chunk, index) => renderChunk(chunk, index))}</div>
  );
};

function renderChunk(chunk: ContentChunk, index: number): React.ReactNode {
  if (!chunk.content) return null;
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
