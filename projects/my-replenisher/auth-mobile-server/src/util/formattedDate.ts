import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt-BR";

export default function formattedDate(date: Date): string {
  const dateFormatted = format(parseISO(date.toISOString()), "dd'/'MM'/'yyyy", {
    locale: pt,
  });

  return dateFormatted;
}
