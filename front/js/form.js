//Formulaire
//Déterminer chaque champ du formulaire
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');

//Déterminer les erreurs de chaque champ du formulaire
const firstNameError = firstName.nextElementSibling;
const lastNameError = lastName.nextElementSibling;
const addressError = address.nextElementSibling;
const cityError = city.nextElementSibling;
const emailError = email.nextElementSibling;

//Créer les RegExp 
const nameCityRegExp = new RegExp(/^[a-zA-ZÀ-ÿ]+([ '\-]?[a-zA-ZÀ-ÿ]+){1,5}$/);
const addressRegExp = new RegExp(/^([0-9]{0,5}) ?[a-zA-ZÀ-ÿ \-,']+([0-9]{0,5}) ?$/);
const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[a-z]{2,10}$/);

//Fonction globale de contrôle du formulaire 
function controlForm() {
    //Fonction qui teste l'expression régulière
    function testRegExp(name, regExp, error) {
        //Si la valeur que l'utilisateur rentre dans le champ correspond à la RegExp
        if (name.value.match(regExp)) {
            //N'afficher aucun message d'erreur
            error.innerHTML = "";
        } else {
            //Sinon, avertir l'utilisateur
            error.innerHTML = "La saisie est incorrecte";
            return false
        };
    };

    //Écouter les événements correspondant à chaque champ
    firstName.addEventListener('change', function () {
        testRegExp(firstName, nameCityRegExp, firstNameError);
    });
    lastName.addEventListener('change', function () {
        testRegExp(lastName, nameCityRegExp, lastNameError);
    });
    address.addEventListener('change', function () {
        testRegExp(address, addressRegExp, addressError);
    });
    city.addEventListener('change', function () {
        testRegExp(city, nameCityRegExp, cityError);
    });
    email.addEventListener('change', function () {
        testRegExp(email, emailRegExp, emailError);
    });
};
controlForm();

//Passer la commande
let submitBtn = document.getElementById('order');
let cart = getCart();

//Écouter l'événement du click pour commander
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //Si le message d'erreur existe (différent d'un contenu vide), avertir l'utilisateur qu'il y a une erreur
    if (firstNameError.innerHTML !== "" || lastNameError.innerHTML !== "" || addressError.innerHTML !== "" || cityError.innerHTML !== "" || emailError.innerHTML !== "") {
        alert('Veuillez remplir correctement le formulaire')
    //Si les champs sont vides, avertir l'utilisateur
    } else if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == "") {
        alert('Veuillez remplir le formulaire')
    // Si le panier est vide, avertir l'utilisateur et rediriger vers la page d'accueil
    } else if (cart == "" || cart.length == 0 || cart == []) {
        alert('Votre panier est vide. Veuillez sélectionner des produits')
        window.location.href = "index.html";
    //Si l'utilisateur confirme sa commande, créer un tableau contenant les informations du ou des produits
    } else if (confirm("Voulez-vous confirmer votre commande ?") == true) {
        let cartItems = [];

        for (let i = 0; i < cart.length; i++) {
            cartItems.push(cart[i].id)
        }
        //Créer l'objet de la commande (contact + produit)
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

        //Envoyer la commande avec la requête POST
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        })
            //Récupérer la réponse de l'API (orderId)
            .then(res => {
                return res.json();
            })
            //Stocker la réponse de l'API (orderId)
            .then((server) => {
                const orderId = server.orderId;
                //Si l'orderId a bien été récupéré, diriger l'utilisateur vers la page confirmation
                if (orderId != "") {
                    location.href = "confirmation.html?orderid=" + orderId;
                };
                //Vider le localstorage une fois que la commande est validée
                window.localStorage.clear();
            });
    } else {
        return false;
    };
});

