import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

form.addEventListener('input', throttle(inStorage, 500));
const localData = localStorage.getItem('feedback-form-state');

reloadPage();

form.addEventListener('submit', onSubmit);

function inStorage() {
    const data = {
            email: email.value,
            message: message.value
    }
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function onSubmit(evt) {
    evt.preventDefault();
     if ((email.value.length && message.value.length) < 1) {
         alert('Всі поля повинні бути заповнені!');
     } else {
         const data = {
             email: email.value,
             message: message.value
         }
         console.log(data);
         evt.currentTarget.reset();
         localStorage.removeItem('feedback-form-state');
    }
}

function reloadPage() {
    if (localData) {
        email.value = JSON.parse(localData).email;
        message.value = JSON.parse(localData).message;
    } else {
        email.value = '';
        message.value = '';
    }
}