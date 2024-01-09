$(document).ready(function() {
  var firstOperand = '';
  var secondOperand = '';
  var operator = '';
  var result = '';
  var arr = [];

  function accessArray(arr) {
    return arr.join('');
  }

  function addNumber(value) {
    var flag = false;
    if(value === '.' && operator !== '' && secondOperand.includes('.')){
      flag = true;
    }
    if(value === '+' || value === '-' || value === '*' || value === '/'){
      flag = true;
    }
    if(!flag){
      if (operator === '') {
        if (!(firstOperand.includes('.') && value === '.')){
          firstOperand += value;
        }
        
        arr = [firstOperand];
      } else {
        if (!(secondOperand.includes('.') && value === '.')) {
          secondOperand += value;
        }
        if (arr.length > 0 && arr[arr.length - 1].match(/[\+\-\*\/\%]/)) {
          arr.push(secondOperand);
        } else {
          arr.pop();
          arr.push(secondOperand);
        }
      }
      $('#display').val(accessArray(arr));
    }
    
  }

  function addOperator(value) {
    if (operator === '') {
      if (firstOperand !== '') {
        operator = value;
        arr.push(operator);
      }
    } else {
      calculate();
      operator = value;
      if (operator !== '=') {
        arr.push(operator);
      }
    }
    $('#display').val(accessArray(arr));
  }

  function clearAll() {
    $('#display').val('0');
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    arr = [];
  }

  function deleteLastDigit() {
    var currentValue = $('#display').val();

    if (currentValue.length > 0) {
      $('#display').val(currentValue.slice(0, -1));

      if (operator === '') {
        firstOperand = $('#display').val();
        arr = [firstOperand];
      } else {
        if (secondOperand !== '') {
          secondOperand = secondOperand.slice(0, -1);
          arr[arr.length - 1] = secondOperand;
        }
      }
    }
  }

  function calculate() {
    var num1 = parseFloat(firstOperand);
    var num2 = parseFloat(secondOperand || '0');
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          result = null;
        }
        break;
      case '%':
        result = num1 % num2;
        break;
    }
    if (isNaN(result)) {
      result = 0;
    } else {
      if (result === null) {
        $('#display').val('Cannot divide by 0');
      } else {
        $('#display').val(result);
      }

      firstOperand = result.toString();
      secondOperand = '';
      operator = '';
      arr = [result];
    }
  }

  $('.btn').click(function() {
    var value = $(this).text();

    if ($.isNumeric(value)) {
      addNumber(value);
    } else if (value === '.' ) {
      addNumber('.');
    } else if (value === 'AC') {
      clearAll();
    } else if (value === 'DEL') {
      deleteLastDigit();
    } else {
      addOperator(value);
    }
  });
});