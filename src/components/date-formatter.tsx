import { parseISO, format } from "date-fns";

type DateFormatterProps = {
  dateString?: string | Date;
};

const DateFormatter = ({ dateString }: DateFormatterProps) => {
  if (!dateString) return null;
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  if (!date) return null;
  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL	d, yyyy")}</time>
  );
};

export default DateFormatter;
