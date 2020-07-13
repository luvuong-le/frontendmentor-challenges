const trialForm = document.getElementById('trialForm');
const formInput = document.querySelectorAll('.form__input');

const errorTypes = {
    EMAIL_INVALID: 'EMAIL_INVALID',
    REQUIRED: 'REQUIRED',
    RESET: 'RESET',
    SET: 'SET',
};

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

formInput.forEach(input => {
    input.addEventListener('keyup', e => {
        const { valid, errorType } = checkInputValidation(input);
        return valid ? setErrorStyles(input, errorTypes.RESET) : toggleError(input, errorType);
    });
});

trialForm.addEventListener('submit', e => {
    e.preventDefault();

    let readySend = true;
    
    formInput.forEach(input => {
        setErrorStyles(input, errorTypes.RESET);
        const { valid, errorType } = checkInputValidation(input);
        
        if (!valid) {
            toggleError(input, errorType);
        }
        
        if (readySend) {
            readySend = valid ? true : false;
        }
    });

    if (readySend) {
        console.log("Posting Form");
    }
});

const checkInputValidation = e => {
    let valid = true;
    let errorType = null; 

    if (!e.value) {
        valid = false;
        errorType = errorTypes.REQUIRED;
    };

    if (e.value && e.type === "email" && !RegExp(emailRegex).test(e.value)) {
        valid = false;
        errorType = errorTypes.EMAIL_INVALID;
    }
    
    return { valid, errorType };
};

const toggleError = (input, errorType) => {
    const errorMessage = input.parentElement.nextElementSibling; 

    switch (errorType) {
        case errorTypes.EMAIL_INVALID:
            errorMessage.textContent = 'Looks like this is not an email';
            break;
        case errorTypes.REQUIRED:
            errorMessage.textContent = `${input.placeholder} cannot be empty`;
            break;
        default:
            break;
    }

    setErrorStyles(input, errorTypes.SET);
};

const setErrorStyles = (input, type) => {
    input.style.border = type === errorTypes.SET ? '1px solid red' : '';
    input.style.color = type === errorTypes.SET ? 'red' : 'initial';
    input.nextElementSibling.style.display = type === errorTypes.SET ? 'block' : 'none';
    
    type === errorTypes.SET ? input.classList.add('placeholder-error') : input.classList.remove('placeholder-error');

    if (type === errorTypes.RESET) {
        input.parentElement.nextElementSibling.textContent = '';
    }
}