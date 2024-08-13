import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import { ContentTitle } from "./content-title";
import type { Content } from "@/types";

type ContentHeaderProps = {
  content: Content;
};

export function ContentHeader({ content }: ContentHeaderProps) {
  const { contentType, title, coverImage, date, slug } = content;
  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      {date && (
        <div className="mb-6 text-2xl">
          <DateFormatter dateString={date} />
        </div>
      )}
      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage content={content} isLink={false} />
        </div>
      )}
    </>
  );
}
