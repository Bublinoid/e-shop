'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * sidebars toggle - navbar, user, favourite, cart
 */

document.querySelectorAll("[data-toggler]").forEach( toggle => {
  const sidebar = document.querySelector("[data-" + toggle.id + "]");
  const overlay = document.querySelector("[data-overlay-" + toggle.id + "]");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    overlay.classList.toggle("active")
  });
});


/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 0) {
      input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 8) + '-' + input.substring(8, 10);
    }
    e.target.value = input;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const authForm = document.getElementById('auth-form');

  authForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение отправки формы

    const phoneInput = document.getElementById('phone');
    const phoneNumber = phoneInput.value.trim();

    if (phoneNumber) {
      fetch('/submit_auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: phoneNumber })
      })
          .then(response => response.json())
          .then(data => {
            // Обработка ответа от сервера
            if (data.success) {
              alert('Код отправлен на ваш телефон.');
              // Здесь можно перенаправить на страницу ввода кода или показать форму для кода
            } else {
              alert('Ошибка при отправке кода. Попробуйте снова.');
            }
          })
          .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
          });
    } else {
      alert('Пожалуйста, введите номер телефона.');
    }
  });
});

