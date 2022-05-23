var formSignUp = document.querySelector('#form_signup');
var formSignIn = document.querySelector('#form_signin');
var username = document.querySelector('#username');
var phone = document.querySelector('#phone');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var confirmPassword = document.querySelector('#confirm_password');

var email2 = document.querySelector('#email2');
var password2 = document.querySelector('#password2');
var listInput = [username, phone, email, password, confirmPassword];
var listInput2 = [email2, password2];

document.querySelector("#linkSignIn").onclick = e => {
    e.preventDefault();
    formSignUp.classList.add("form_hidden");
    formSignIn.classList.remove("form_hidden");
};

document.querySelector("#linkSignUp").onclick = e => {
    e.preventDefault();
    formSignIn.classList.add("form_hidden");
    formSignUp.classList.remove("form_hidden");
};

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function showError(input, message = "") {
    let parent = getParent(input, ".form_group");
    let small = parent.querySelector('small');
    parent.classList.add('invalid');
    small.innerText = message;

}

function showSuccess(input, message = "") {
    let parent = getParent(input, ".form_group");
    let small = parent.querySelector('small');
    parent.classList.remove('invalid');
    small.innerText = message;

}

function checkEmptyElement(input) {
    let isEmptyError = false;
    input.value = input.value.trim();
    if (!input.value) {
        showError(input, 'Please enter this field!');
        isEmptyError = true;
    } else {
        showSuccess(input)
    }
    return isEmptyError;
}

function checkValidPhone(input) {
    input.value = input.value.trim();
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let isPhoneInvalid = !regexPhone.test(input.value);
    if (regexPhone.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Phone Invalid');
    }
    return isPhoneInvalid;
}

function checkValidEmail(input) {
    input.value = input.value.trim();

    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let isEmailInvalid = !regexEmail.test(input.value);
    if (regexEmail.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email Invalid');
    }
    return isEmailInvalid;
}

function checkValidPassword(input) {
    input.value = input.value.trim();
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let isPasswordInvalid = !regexPassword.test(input.value);
    if (regexPassword.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Password Invalid');
    }
    return isPasswordInvalid;
}

function checkMatchPassword(password, confirmPassword) {
    password.value = password.value.trim();
    confirmPassword.value.confirmPassword.value.trim();
    let isConfirmPasswordInvalid = false;
    if (password.value) {
        if (password.value === confirmPassword.value) {
            showSuccess(confirmPassword);
        } else {
            showError(confirmPassword, 'Password does not match');
            isConfirmPasswordInvalid = true;
        }
    } else {
        showError(confirmPassword, 'Password not entered');
        isConfirmPasswordInvalid = true;
    }
    return isConfirmPasswordInvalid;
}

function Validate(listInput) {
    listInput.forEach(input => {
        if (input) {
            input.onblur = function() {
                if (checkEmptyElement(input) == false) {
                    if (input == phone) {
                        checkValidPhone(input);
                    }
                    if (input == email || input == email2) {
                        checkValidEmail(input);
                    }
                    if (input == password || input == password2) {
                        checkValidPassword(input);
                    }
                    if (input == confirmPassword) {
                        checkMatchPassword(password, input);
                    }
                }
            }

            input.oninput = function() {
                showSuccess(input);
            }
        }
    });
}

Validate(listInput);
Validate(listInput2);
formSignUp.onsubmit = function(e) {
    e.preventDefault();
    listInput.forEach(input => {
        if (input) {
            if (checkEmptyElement(input) == false) {
                if (input == phone) {
                    checkValidPhone(input);
                }
                if (input == email) {
                    checkValidEmail(input);
                }
                if (input == password) {
                    checkValidPassword(input);
                }
                if (input == confirmPassword) {
                    checkMatchPassword(password, input);
                }
            }

        }
    });
}


formSignIn.onsubmit = function(e) {
    e.preventDefault();
    listInput.forEach(input => {
        if (input) {
            if (checkEmptyElement(input) == false) {

                if (input == email2) {
                    checkValidEmail(input);
                }
                if (input == password2) {
                    checkValidPassword(input);
                }
            }
        }
    });
}