import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import { ContentTitle } from "./content-title";
import { type Author } from "@/types";

type ContentHeaderProps = {
  contentType: string;
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function ContentHeader({
  contentType,
  slug,
  title,
  coverImage,
  date,
  author,
}: ContentHeaderProps) {
  return (
    <>
      <ContentTitle>{title}</ContentTitle>
      <div className="mb-6 text-2xl">
        <DateFormatter dateString={date} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          contentType={contentType}
          slug={slug}
          title={title}
          src={coverImage}
        />
      </div>
    </>
  );
}
