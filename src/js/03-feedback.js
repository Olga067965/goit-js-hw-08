import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

form.addEventListener('input', event => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // збережено об'єкт з полями у локальному сховищі
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

function populateFormFields() {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

// викличено функцію при завантаженні сторінки
window.addEventListener('DOMContentLoaded', populateFormFields);

form.addEventListener(
  'input',
  throttle(event => {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };

    // збережено об'єкт з полями у локальному сховищі
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');

  emailInput.value = '';
  messageInput.value = '';

  console.log('Form Data:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});
