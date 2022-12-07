export default function calculate_age(birth_date: string): number {
  var current_date = new Date();
  var current_year = current_date.getFullYear();

  var birth_date_splited = birth_date.split("/");

  var day = Number(birth_date_splited[0]);
  var month = Number(birth_date_splited[1]);
  var year = Number(birth_date_splited[2]);

  var age = current_year - year;
  var current_month = current_date.getMonth() + 1;

  //Se mes atual for menor que o nascimento, nao fez aniversario ainda;
  if (current_month < month) {
    age--;
  } else {
    //Se estiver no mes do nascimento, verificar o dia
    if (current_month == month) {
      if (new Date().getDate() < day) {
        //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        age--;
      }
    }
  }

  return age;
}