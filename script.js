$(function() {
  // Only allow number input, enter, and backspace
  $('input').on('keypress', function(evt) {
    if ( !(evt.key === 'Enter' || evt.key === 'Backspace' || (evt.key >= 0 && evt.key <= 9)) ) {
      evt.preventDefault();
    }
  });

  $('form').on('submit', function(evt) {
    evt.preventDefault();
    convert( $('input').val() );
  });

  $('#clear').on('click', function(evt) {
    $('#result').empty();
    $('input').focus();
  });
});


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

  $('#result').append(`<li>${$('input').val()} = ${array.join('')}</li>`);

  $('input').val('');
}
