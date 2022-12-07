import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt-BR";

export default function formattedDate(date: string): string {
  const dateFormatted = format(parseISO(date), "HH:mm' de 'dd'/'MM'", {
    locale: pt,
  });

  return dateFormatted;
}
