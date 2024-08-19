"use client";

import React from "react";
import ContactForm from "./shortcodes/contact-form";
import Gallery from "./shortcodes/gallery";
import type { ContentChunk, ContentType } from "@/types";
import { ContentList } from "./content/content-list";

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
  switch (chunk.type) {
    case "text":
      if (!chunk.content) return null;
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: chunk.content }} />
      );
    case "component":
      if (!chunk.content) return null;
      const Component = componentMap[chunk.content];
      return Component ? <Component key={index} /> : null;
    case "gallery":
      if (!chunk.content) return null;
      return <Gallery key={index} content={chunk.content} />;
    case "content":
      if (!chunk.data) return null;
      return (
        <ContentList
          key={index}
          items={chunk.data?.results}
          contentType={chunk.params?.contentType as ContentType}
          pagination={chunk.data?.pagination}
          showTitle={true}
        />
      );
    default:
      return null;
  }
}

export default ContentRenderer;
