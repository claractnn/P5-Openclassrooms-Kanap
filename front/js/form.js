// FORMULAIRE
// Déclarer les variables de chaque input du formulaire
//const form = document.querySelector('.cart__order__form');
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
const nameCityRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]+([ '-]?[a-zA-ZÀ-ÿ]+)$/);
const addressRegExp = new RegExp(/^([0-9]{0,4}) ?[a-zA-ZÀ-ÿ \-,']+$/);
const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[a-z]{2,10}$/);

// Créer une fonction de contrôle du formulaire 
function controlForm() {
    // Créer une fonction qui test l'expréssion régulière
    function testRegExp(name, regExp, error) {
        if(name.value.match(regExp)) {
            error.innerHTML = "";
        } else {
            error.innerHTML = "La saisie est incorrecte";
            return false
        };
    };

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

//COMMANDE

let submitBtn = document.getElementById('order');
//let cart = JSON.parse(localStorage.getItem("panier"));
let cart = getCart();

//Écouter l'événement du click pour commander
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (firstNameError.innerHTML !== "" || lastNameError.innerHTML !== "" || addressError.innerHTML !== "" || cityError.innerHTML !== "" || emailError.innerHTML !== "") {
        alert('Veuillez remplir correctement le formulaire')
    } else if(firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == "") {
        alert('Veuillez remplir le formulaire')
    } else if (cart == "" || cart.length == 0) {
        alert('Votre panier est vide. Veuillez sélectionner des produits')
        window.location.href = "index.html";
    } else if (confirm("Voulez-vous confirmer votre commande ?") == true) {
        let cartItems = []; 
        
        for(let i = 0; i < cart.length; i++) {
            cartItems.push(cart[i].id)
        }
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: cartItems,
        };
        //send();

        //Créer une fonction qui renvoie la requête post(pour envoyer la commande)
        
        let sendData = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                //accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            //Récupérer et stocker la réponse de l'API (orderId)
            .then(res => {
                return res.json();
            })
            .then((server) => {
                const orderId = server.orderId;
                //Si l'orderId a bien été récupéré, diriger l'utilisateur vers la page confirmation
                if(orderId != "") {
                    location.href = "confirmation.html?orderid=" + orderId;
                };
                window.localStorage.clear();
            });
    } else {
        return false;
    };
});






// TEST
    /*//Créer une variable pour envoyer les données avec la méthode POST
    function sendData(data) {
        //Requêter l'API et la méthode POST

        fetch(apiUrlOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //accept: "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((order) => {
            //localStorage.clear();
            window.location.href = "confirmation.html?orderId=" + order.orderId;
        })
        .catch(() => {
            alert('Une erreur est survenue');
        });
    
    };*/
    

