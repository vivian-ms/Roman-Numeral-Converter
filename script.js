var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
var value = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

$(function() {
  $('#romanToNumber').css('width', $('#numberToRoman').css('width'));

  $(window).on('resize', function(evt) {
    $('#romanToNumber').css('width', $('#numberToRoman').css('width'));
  });

  // Don't allow space
  $('input').on('keypress', function(evt) {
    if (evt.code === 'Space') {
      evt.preventDefault();
    }
  });

  $('#numberToRoman_input').on('keypress', function(evt) {
    // Only allow numbers
    if (evt.key !== 'Enter') {
      // Don't allow 0 to be first #
      if ( ($('#numberToRoman_input').val().length === 0 && !(evt.key >= 1 && evt.key <= 9)) ||
        ($('#numberToRoman_input').val().length > 0 && !(evt.key >= 0 && evt.key <= 9)) ) {
        evt.preventDefault();
      }
    }
  });

  $('#romanToNumber_input').on('keypress', function(evt) {
    // Only allow i, v, x, l, c, d, m (case insensitive)
    if (evt.key !== 'Enter') {
      if (!(evt.key === 'i' || evt.key === 'v' || evt.key === 'x' || evt.key === 'l' || evt.key === 'c' || evt.key === 'd' || evt.key === 'm' || evt.key === 'I' || evt.key === 'V' || evt.key === 'X' || evt.key === 'L' || evt.key === 'C' || evt.key === 'D' || evt.key === 'M')) {
        evt.preventDefault();
      }
    }
  });


  $('#numberToRoman_form').on('submit', function(evt) {
    evt.preventDefault();
    convertToRoman( $('#numberToRoman_input').val() );
  });

  $('#romanToNumber_form').on('submit', function(evt) {
    evt.preventDefault();
    convertToNumber( $('#romanToNumber_input').val().toUpperCase() );
  });


  $('#numberToRoman_clearButton').on('click', function(evt) {
    $('#numberToRoman_history').empty();
    $('#numberToRoman_input').val('').focus();
  });

  $('#romanToNumber_clearButton').on('click', function(evt) {
    $('#romanToNumber_history').empty();
    $('#romanToNumber_input').val('').focus();
  });
});  // End ready()



function convertToRoman(number) {
  let array = [];

  while (number > 0) {
    for (let i = 0; i < roman.length; i++) {
      if ((number - value[i]) >= 0) {
        array.push(roman[i]);
        number -= value[i];
        i = roman.length;  // Exit for loop
      }  // End if statement
    }  // End for loop
  }  // End while loop

  $('#numberToRoman_history').prepend(`<li>${$('#numberToRoman_input').val()} = <span class="roman">${array.join('')}</span></li>`);

  $('#numberToRoman_input').val('');
}  // End convertToRoman()



function convertToNumber(romanNumeral) {
  /* Thousands: M{0,3} = 0 - 3000
      Hundreds: (CM|CD|D?C{0,3})
        CM = 900
        CD = 400
        D?C{0, 3} -> DC{0,3} = 500 - 800, C{0,3} = 0 - 300
      Tens: (XC|XL|L?X{0,3})
        XC = 90
        XL = 40
        L?X{0,3} -> LX{0,3} = 50 - 80, X{0,3} = 0 - 30
      Ones: (IX|IV|V?I{0,3})
        IX = 9
        IV = 4
        V?I{0,3} -> VI{0,3} = 5 - 8, I{0,3} = 0 - 3 */

  let regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  // If valid roman numeral
  if (regex.test(romanNumeral)) {
    let number = 0;

    while (romanNumeral) {
      for (let i = 0; i < roman.length; i++) {
        // If romanNumeral begins with roman[i]
        if ( romanNumeral.indexOf(roman[i]) === 0 ) {
          number += value[i];
          romanNumeral = romanNumeral.replace(roman[i], '');  // Remove roman[i] from romanNumeral
          i = roman.length;  // Exit for loop
        }  // End if statement
      }  // End for loop
    }  // End while loop

    $('#romanToNumber_history').prepend(`<li><span class="roman">${$('#romanToNumber_input').val()}</span> = ${number}`);

    // Else not a valid roman numeral
  } else {
    $('#romanToNumber_history').prepend(`<li><span class="roman">${$('#romanToNumber_input').val()}</span> is not a valid roman numeral`);
  }  // End else if statement

  $('#romanToNumber_input').val('');
}  // End convertToNumber()
