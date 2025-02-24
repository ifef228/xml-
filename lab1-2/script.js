window.onload = function() {
    let a = ''
    let b = ''

    let expressionResult = ''
    let selectedOperation = null

    let currentTheme = 'white'

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

    //set callback to change znak button
    document.getElementById("btn_op_sign").onclick = function() {
        if(a != '' && b == '') {
            a = (-1) * a
            document.getElementById('result').innerHTML = a
        } else if (b != '') {
            b = (-1) * b
            document.getElementById('result').innerHTML = b
        } else return
    }


    //moon
    toMoonTheme = function() {
        document.getElementById('body').style.backgroundColor = 'black'

        let buttons = document.querySelectorAll('[id ^= "btn_digit_"]')
        buttons.forEach(
            button => {
                // button.addEventListener('mouseenter', function() {
                //     this.style.color = rgb(255, 0, 0)
                // })

                // button.addEventListener('mouseleave', function() {
                //     this.style.color = 'white'
                // })

                button.style.backgroundColor = 'black'
                button.style.color = 'white'

                
            }
        )


        document.getElementById('result').style.backgroundColor = 'black'
        document.getElementById('result').style.color = 'white'


        currentTheme = 'black'
    }
    
    toDayTheme = function() {
        document.getElementById('body').style.backgroundColor = 'white'
        document.querySelectorAll('[id ^= "btn_digit_"]').forEach(
            button => {
                button.style.backgroundColor = 'white'
                button.style.color = 'black'
            }
        )
        document.getElementById('result').style.backgroundColor = 'white'
        document.getElementById('result').style.color = 'black'

        
        currentTheme = 'white'
    }

    document.getElementById('btn_moontheme').onclick = function() {
        if (currentTheme == 'white') {
            toMoonTheme()
        } else {
            toDayTheme()
        }
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