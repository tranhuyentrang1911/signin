function Validator(options) {

    //Lấy thẻ cha của small
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function Validate(inputElement, rule) {

        // var parent = getParent(inputElement, '.form_group');
        // var errorElement = parent.querySelector('.form_message');
        var parent = getParent(inputElement, options.parentSelector);
        var errorElement = parent.querySelector(options.errorSelector);


        var elementRules = selectorRules[rule.selector];
        var message;
        for (var i = 0; i < elementRules.length; i++) {
            message = elementRules[i](inputElement.value);
            if (message) break;

        }

        if (errorElement && message) {
            errorElement.innerText = message;
            getParent(inputElement, options.parentSelector).classList.add('invalid');

        }
        return !message;

    }

    var form = document.querySelector(options.form);
    if (form) {
        var rules = options.rules;
        var selectorRules = {};
        form.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            rules.forEach(rule => {
                var inputElement = form.querySelector(rule.selector);
                var isValid = Validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }

            })
            console.log(isFormValid)
            if (isFormValid === true) {
                if ('login' in options) {
                    options.login();
                }
            }


        }
        rules.forEach(rule => {

            //Nếu selectorRules[rule.selector] có value là  mảng thì thêm phần tử vào mảng
            //, không thì cho nó là một mảng có 1 phần tử là rule.test

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = form.querySelector(rule.selector);
            // var parent = getParent(inputElement, '.form_group');
            // var errorElement = parent.querySelector('.form_message');
            var parent = getParent(inputElement, options.parentSelector);
            var errorElement = getParent(inputElement, options.parentSelector).querySelector(options.errorSelector);


            if (inputElement) {

                inputElement.onblur = function() {
                    Validate(inputElement, rule);
                }
                inputElement.oninput = function() {
                    errorElement.innerText = "";
                    parent.classList.remove('invalid');
                }
            }
        })
    }

}

Validator.isRequired = function(selector) {
    return {
        selector,
        test: function(value) {
            return value.trim() ? undefined : "Please enter this field!";
        }
    }
}
Validator.isPhone = function(selector) {
    return {
        selector,
        test: function(value) {
            const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (regexPhone.test(value)) {
                return undefined;
            } else {
                return "Phone Invalid";
            }
        }
    }
}
Validator.isEmail = function(selector) {
    return {
        selector,
        test: function(value) {
            const regexEmail =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regexEmail.test(value)) {
                return undefined;
            } else {
                return "Email Invalid";
            }
        }
    }
}
Validator.isPassword = function(selector) {
    return {
        selector,
        test: function(value) {
            const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (regexPassword.test(value)) {
                return undefined;
            } else {
                return "Password Invalid";
            }

        }
    }
}
Validator.isMatchPassword = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            if (getConfirmValue()) {
                return value === getConfirmValue() ? undefined : message || `Input value does not match`;
            }

        }
    }
}