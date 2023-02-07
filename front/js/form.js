
// Déclarer les variables de chaque input du formulaire
const form = document.querySelector('.cart__order__form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');

// Déclarer les variables pour les erreurs de chaque input du formulaire
const firstNameError = firstName.nextElementSibling;
const lastNameError = lastName.nextElementSibling;
const addressError = address.nextElementSibling;
const cityError = city.nextElementSibling;
const emailError = email.nextElementSibling;

// Créer les RegExp 
const nameCityRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]+(['-]?[a-zA-ZÀ-ÿ]+)$/);
const addressRegExp = new RegExp(/^[0-9]{1,3}[a-zA-ZÀ-ÿ -,']+$/);
const emailRegExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,10}$/)


// Créer les différentes fonctions pour la validation des formats 

