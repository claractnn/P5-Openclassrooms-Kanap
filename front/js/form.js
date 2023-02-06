
// Déclarer les variables de chaque input du formulaire
let form = document.querySelector('.cart__order__form');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

// Créer les RegExp 
const nameRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]+([-]?[a-zA-ZÀ-ÿ])$/);
// nom composé : /^[A-zÜ-ü]{1,24}([ -]{1}[A-zÜ-ü]{1,24})?$

// Créer les différentes fonctions pour la validation des formats 

