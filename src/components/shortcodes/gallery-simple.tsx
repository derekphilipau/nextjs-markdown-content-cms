import React from "react";

interface GalleryProps {
  content: string;
}

const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const imgRegex = /<img\s+src="([^"]+)"\s+alt="([^"]+)">/g;
  const images = Array.from(content.matchAll(imgRegex));

  return (
    <div className="grid grid-cols-2 gap-6">
      {images.map(([_, src, alt], index) => (
        <div key={index} className="w-full">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover !my-0"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
