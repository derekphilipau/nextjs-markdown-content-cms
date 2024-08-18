import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  content: string;
}

const Gallery: React.FC<GalleryProps> = ({ content }) => {
  const imgRegex = /<img\s+src="([^"]+)"\s+alt="([^"]+)">/g;
  const images = Array.from(content.matchAll(imgRegex));
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: selectedIndex,
    align: "center",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const handleResize = () => {
      if (emblaApi) {
        emblaApi.reInit();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [emblaApi]);

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {images.map(([_, src, alt], index) => (
          <div
            key={index}
            className="w-full cursor-pointer"
            onClick={() => {
              setSelectedIndex(index);
              setOpen(true);
            }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-cover !my-0"
            />
          </div>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center">
            <div className="w-full h-full relative flex flex-col">
              <div className="embla flex-grow" ref={emblaRef}>
                <div className="embla__container h-full">
                  {images.map(([_, src, alt], index) => (
                    <div
                      key={index}
                      className="embla__slide flex items-center justify-center px-4"
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <button
                  className="bg-black/50 hover:bg-black rounded-full p-2"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  className="bg-black/50 hover:bg-black rounded-full p-2"
                  onClick={scrollNext}
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black rounded-full p-2 z-10"
                  aria-label="Close"
                >
                  <X className="w-8 h-8" />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Gallery;
