import { parseISO, format } from "date-fns";

type Props = {
  dateString: string | Date;
};

const DateFormatter = ({ dateString }: Props) => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL	d, yyyy")}</time>
  );
};

export default DateFormatter;
