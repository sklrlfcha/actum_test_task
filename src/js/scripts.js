function checkFields() {
    var objValues = {};
    var inputName = document.getElementById('inputName'),
        inputSurname = document.getElementById('inputSurname'),
        inputEmail = document.getElementById('inputEmail'),
        inputBirthday = document.getElementById('inputBirthday'),
        inputChildren = document.getElementById('inputChildren');

    objValues.inputName = inputName.value;
    objValues.inputSurname = inputSurname.value;
    objValues.inputBirthday = inputBirthday.value;
    objValues.inputEmail = inputEmail.value;
    objValues.inputChildren = inputChildren.value;

    var errorFields = notEmpty(objValues);

    if (errorFields.length !== 0) {
        for (var field of errorFields) {
            document.getElementById(field).classList.add('invalid');
        }
    } else {
        if (checkFlexFields(inputEmail, inputBirthday)) {
            sendData(objValues);
        }
    }
}

function notEmpty(values) {
    var errorFields = [];

    for(var value in values ) {
        if (values[value] == "") {
            errorFields[errorFields.length] = value;
        }
    }

    return errorFields;
}

function checkFlexFields(inputEmail, inputBirthday) {
    var result = false;
    result = checkEmail(inputEmail) & checkBirthday(inputBirthday);
    return result;
}

function checkEmail(email) {
    var result = false,
        expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    result = expression.test(email.value);

    if (!result) {
        email.classList.add('invalid');
    }

    return result;
}

function checkBirthday(birthday) {
    var result = false,
        year = birthday.value.split("-")[0];

    result = birthday.value.length == 10 & year >= 1900 & year <= (new Date().getFullYear());

    if (!result) {
        birthday.classList.add('invalid');
    }

    return result;
}

function clearClass(el) {
    el.classList.remove('invalid');
}

function sendData(objValues) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        alert(this.responseText);
    };

    var gender = document.getElementById('male').checked;
    /** TRUE WILL BE MALE, FALSE WILL BE FEMALE */

    xhr.open("POST", "https://actum-form-ulcrunoxba.now.sh/api/submit");
    xhr.setRequestHeader("Content-type", "application/x-www-from-urlencoded");
    xhr.send('name=' + objValues.inputName + '&surname=' + objValues.inputSurname + '&date=' + objValues.inputBirthday + '&email=' + objValues.inputEmail + '&gender=' + gender + '&children=' + objValues.inputChildren);
}