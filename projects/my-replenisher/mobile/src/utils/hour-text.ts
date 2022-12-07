export default function hourText(hour: number): string {
  var text: string = "";

  if (hour > 0 && hour < 12) {
    text = "Bom Dia";
  } else if (hour > 13 && hour < 18) {
    text = "Boa Tarde";
  } else {
    text = "Boa Noite";
  }

  return text;
}
