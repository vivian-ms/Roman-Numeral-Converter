function convert(number) {
  let roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let value = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  let array = [];

  while (number > 0) {
    for (let i = 0; i < roman.length; i++) {
      if ((number - value[i]) >= 0) {
        array.push(roman[i]);
        number -= value[i];
        i = roman.length;
      }
    }
  }

  return array.join('');
}
