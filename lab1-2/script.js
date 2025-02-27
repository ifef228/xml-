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
            a = ((-1) * a)
            outputElement.innerHTML = a
        } else if (b != '') {
            b = ((-1) * b)
            outputElement.innerHTML = b
        } else return
    }

    //set callback to all unary ops
    document.getElementById('btn_op_sqrt').onclick = function() {
        if(a != '' && b == '') {
            a = Math.sqrt(a)
            outputElement.innerHTML = a
        } else if (b != '') {
            b = Math.sqrt(b)
            document.getElementById('result').innerHTML = b
        } else return
    }

    document.getElementById('btn_op_square').onclick = function() {
        if(a != '' && b == '') {
            a = Math.pow(a, 2)
            outputElement.innerHTML = a
        } else if (b != '') {
            b = Math.pow(b, 2)
            document.getElementById('result').innerHTML = b
        } else return
    }

    document.getElementById('btn_op_factorial').onclick = function() {
        if(a != '' && b == '') {
            a = factorial(a)
            outputElement.innerHTML = a
        } else if (b != '') {
            b = factorial(b)
            document.getElementById('result').innerHTML = b
        } else return
    }

    function factorial(n) {
        if (n === 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
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
    clear = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    document.getElementById("btn_op_clear").onclick = function() { 
        clear()
    }

    //backspace
    document.getElementById("btn_op_backspace").onclick = function() {
        a = a.toString()
        b = b.toString()
        if (b != '') {
            if (b.length == 1 || (b.charAt(0) == '-' && b.length == 2)) {
                outputElement.innerHTML = 0;
                b = ''
            } else {
                b = b.substring(0, b.length - 1);
                outputElement.innerHTML = b;
            }
            
        } else if (selectedOperation == null && a != '') {
            if (a.length == 1  || (a.charAt(0) == '-' && a.length == 2)) {
                outputElement.innerHTML = 0;
                a = ''
            } else {
                a = a.substring(0, a.length - 1);
                outputElement.innerHTML = a;
            }
        } 
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