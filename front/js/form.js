
// Déclarer les variables de chaque input du formulaire
const form = document.querySelector('.cart__order__form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
console.log(email.value)

// Déclarer les variables pour les erreurs de chaque input du formulaire
const firstNameError = firstName.nextElementSibling;
const lastNameError = lastName.nextElementSibling;
const addressError = address.nextElementSibling;
const cityError = city.nextElementSibling;
const emailError = email.nextElementSibling;

// Créer les RegExp 
const nameCityRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]+(['-]?[a-zA-ZÀ-ÿ]+)$/);
const addressRegExp = new RegExp(/^[0-9]{1,3}[a-zA-ZÀ-ÿ -,']+$/);
const emailRegExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,10}$/);

// Créer une fonction de contrôle du formulaire 
function controlForm() {
    // Créer une fonction qui test l'expréssion régulière
    function testRegExp(name, regExp, error) {
        if(name.value.match(regExp)) {
            error.innerHTML = "";
        } else {
            error.innerHTML = "La saisie est incorrecte";
            return false
        }
    }

    // Écouter les événements correspondant à chaque input
    firstName.addEventListener('change', function() {
        testRegExp(firstName, nameCityRegExp, firstNameError);
    });
    lastName.addEventListener('change', function() {
        testRegExp(lastName, nameCityRegExp, lastNameError);
    });
    address.addEventListener('change', function() {
        testRegExp(address, addressRegExp, addressError);
    });
    city.addEventListener('change', function() {
        testRegExp(city, nameCityRegExp, cityError);
    });
    email.addEventListener('change', function() {
        testRegExp(email, emailRegExp, emailError);
    });
};

controlForm();
// Créer les différentes fonctions pour la validation des formats 

