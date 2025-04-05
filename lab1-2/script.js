window.onload = function() {
    let a = ''
    let b = ''
    let saved = '0'
    let expressionResult = ''
    let selectedOperation = null
    let isDarkTheme = false
    
    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    const themeButton = document.getElementById("btn_theme")
    const body = document.body

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.value = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.value = b
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })

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

    document.getElementById("btn_op_sign").onclick = function() {
        if(a != '' && b == '') {
            a = (-1 * parseFloat(a)).toString()
            outputElement.value = a
        } else if (b != '') {
            b = (-1 * parseFloat(b)).toString()
            outputElement.value = b
        }
    }

    document.getElementById('btn_op_rnd').onclick = function() {
        const floor = 1000000000000
        if (selectedOperation != null) {
            b = Math.ceil(Math.random() * floor).toString()
            outputElement.value = b
        } else {
            a = Math.ceil(Math.random() * floor).toString()
            outputElement.value = a
        }
    }

    document.getElementById('btn_op_sqrt').onclick = function() {
        if(a != '' && b == '') {
            a = Math.sqrt(parseFloat(a)).toString()
            outputElement.value = a
        } else if (b != '') {
            b = Math.sqrt(parseFloat(b)).toString()
            outputElement.value = b
        }
    }

    document.getElementById('btn_op_square').onclick = function() {
        if(a != '' && b == '') {
            a = Math.pow(parseFloat(a), 2).toString()
            outputElement.value = a
        } else if (b != '') {
            b = Math.pow(parseFloat(b), 2).toString()
            outputElement.value = b
        }
    }

    document.getElementById('btn_op_factorial').onclick = function() {
        function factorial(n) {
            if (n === 0) return 1
            return n * factorial(n - 1)
        }

        if(a != '' && b == '') {
            a = factorial(parseInt(a)).toString()
            outputElement.value = a
        } else if (b != '') {
            b = factorial(parseInt(b)).toString()
            outputElement.value = b
        }
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.value = '0'
    }

    document.getElementById("btn_op_backspace").onclick = function() {
        if (b != '') {
            if (b.length == 1 || (b.charAt(0) == '-' && b.length == 2)) {
                outputElement.value = '0'
                b = ''
            } else {
                b = b.substring(0, b.length - 1)
                outputElement.value = b
            }
        } else if (selectedOperation == null && a != '') {
            if (a.length == 1 || (a.charAt(0) == '-' && a.length == 2)) {
                outputElement.value = '0'
                a = ''
            } else {
                a = a.substring(0, a.length - 1)
                outputElement.value = a
            }
        } 
    }

    function resultFunc() { 
        if (a === '' || b === '' || !selectedOperation) return

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break
            case '+':
                expressionResult = (+a) + (+b)
                break
            case '-':
                expressionResult = (+a) - (+b)
                break
            case '/':
                expressionResult = (+a) / (+b)
                break
            case '%':
                expressionResult = (+a) % (+b)
                break
        }

        a = expressionResult.toString()
        b = ''
        saved = a
        selectedOperation = null
        outputElement.value = a
    }

    document.getElementById("btn_op_equal").onclick = resultFunc

    document.getElementById('btn_op_mrplus').onclick = function() {
        if (selectedOperation != null) {
            b = (+1) * parseFloat(b) + (+1) * parseFloat(saved)
            resultFunc()
        } else {
            b = saved
            selectedOperation = '+'
            resultFunc()
        }
    }

    document.getElementById('btn_op_mrminus').onclick = function() {
        if (selectedOperation != null) {
            b = (+1) * parseFloat(b) - (+1) * parseFloat(saved)
            resultFunc()
        } else {
            b = saved
            selectedOperation = '-'
            resultFunc()
        }
    }

    document.getElementById('btn_op_ms').onclick = function() {
        saved = outputElement.value
    }

    document.getElementById('btn_op_mr').onclick = function() {
        if (selectedOperation != null) {
            b = saved
            outputElement.value = b
        } else {
            a = saved
            outputElement.value = a
        }
    }

    // Функция для решения линейного уравнения kx + b = 0
    document.getElementById('btn_linear_eq').onclick = function() {
        if (a === '' || b === '') {
            alert('Введите коэффициенты k и b (k - первое число, b - второе)')
            return
        }

        const k = parseFloat(a)
        const b_coeff = parseFloat(b)
        
        if (k === 0) {
            if (b_coeff === 0) {
                outputElement.value = '∞ решений'
            } else {
                outputElement.value = 'Нет решений'
            }
        } else {
            const solution = (-b_coeff / k).toString()
            a = solution
            b = ''
            selectedOperation = null
            outputElement.value = solution
        }
    }

    // Переключение темы
    themeButton.onclick = function() {
        isDarkTheme = !isDarkTheme
        if (isDarkTheme) {
            body.classList.add('dark-theme')
            themeButton.textContent = '☀️'
        } else {
            body.classList.remove('dark-theme')
            themeButton.textContent = '🌙'
        }
    }
}