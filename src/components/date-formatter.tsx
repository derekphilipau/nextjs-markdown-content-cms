import { parseISO, format } from "date-fns";

type DateFormatterProps = {
  dateString: string | Date;
};

const DateFormatter = ({ dateString }: DateFormatterProps) => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL	d, yyyy")}</time>
  );
};

export default DateFormatter;
