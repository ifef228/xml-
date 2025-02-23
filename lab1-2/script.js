window.onload = function() {
    let a = ''
    let b = ''

    let expressionResult = ''
    let selectedOperation = null

    //reuslt window
    outputElement = document.getElementById("result")

    //all digit buttons
    diditButtons = document.querySelectorAll('[id ^= "btn_digit_"]')


    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

    // set callbacks to digit buttons
    diditButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // set callbacks to ops buttons
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a === '') return
        selectedOperation = '%'
    }

    
    //clear
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    //result
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) % (+b)
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};