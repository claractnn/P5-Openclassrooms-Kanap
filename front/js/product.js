// RÉCUPÉRER L'ID DU PRODUIT DANS L'URL

// Créer une nouvelle URL à partir de l'URL donnée et ajouter searchParams pour manipuler les paramètres de requête d'URL 
let params = (new URL(document.location)).searchParams;

// Ajouter l'id à l'Url 
const id = params.get('id');
const apiProductUrl = 'http://localhost:3000/api/products/' + id;
console.log(apiProductUrl)

// Créer toutes les constantes du produit 
const imageElement = document.getElementsByClassName('item__img')[0];
const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');
const descriptionElement = document.getElementById('description');
const colorsElement = document.getElementById('colors');

// **** variable pour altTxt et imageUrl ? ****

// Créer la bonne Url pour chaque produit en interrogeant l'API
fetch(apiProductUrl) 
    .then(response => response.json())
    .then(data => {
        //Modifier le contenu des variables selon les paramètres de chaque Id/produit dans le DOM
        imageElement.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        titleElement.innerHTML = `<h1>${data.name}</h1>`;
        priceElement.innerHTML = `${data.price}`;
        descriptionElement.innerHTML = `${data.description}`;
        document.title = data.name;

        const parser = new DOMParser();
        const colors = document.getElementById('colors')

        for (i = 0; i < data.colors.length; i++) {
            colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            /*let productColors = `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            const displayColors = parser.parseFromString(productColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);*/
        }
    })
    .catch(() => {
        alert("Le serveur ne répond plus");
    });

    
// AJOUT DES PRODUITS DANS LE PANIER

// Créer deux fonctions pour récupérer les valeurs respectives des éléments (produits)
function colorValue() {
    let color = document.getElementById("colors")
    return color.value
}

function quantityValue() {
    let quantity = document.getElementById("quantity")
    return quantity.value
}

// Définir les éléments d'un produit sélectionné par l'utilisateur
let selectColor = document.getElementById("colors");
let selectQuantity = document.getElementById('quantity');

// Modifier le tableau en ajoutant des eventlistener quand l'utilisateur choisi une couleur ou un nombre d'articles
selectColor.addEventListener("input", e => color = e.target.value);
selectQuantity.addEventListener("input", e => quantity = e.target.value);

// Créer une variable pour le bouton "ajouter au panier"
const button = document.querySelector('#addToCart');
// Créer un eventListener pour le bouton "ajouter au panier"  
button.addEventListener("click", (event) => {
    // Définir la couleur et la quantité choisies à leurs valeurs respectives
    let color = selectColor.value;
    let quantity = selectQuantity.value;

    // Créer un objet du tableau pour le panier
    let cart = [{
        id: id,
        color: color,
        quantity: Number(quantity)
    }];

    // Ajouter des conditions si les options du produit n'ont pas été choisies
    if (color == '') {
        alert('Veuillez sélectionner une couleur')
    } else if (quantity < 1 || quantity == NaN) {
        alert('Veuillez indiquer un nombre d\'articles')
    } else if (quantity > 100) {
        alert('Veuillez indiquer un nombre d\'articles inférieur à 100')
    }

    // Convertir les clés et valeurs de l'objet en string (car localStorage ne peut pas storer d'objet, renvoie : "[object Object]") 
    window.localStorage.setItem("panier", JSON.stringify(cart));

    // Créer une variable pour récupérer l'objet panier (parse the string) 
    let getCart = window.localStorage.getItem("panier");
    console.log(JSON.parse(getCart));

    // Vérifier si le panier est vide si toutes les conditions sont remplies
    let basket = getBasket(); 
    if (cart.lenght == 0) {
        // Créer une fonction qui récupère les éléments du panier 
        function getBasket() {
            // Créer une variable qui définie la récupération des éléments du panier
            let productInLocalStorage = localStorage.getItem("panier")
            if (productInLocalStorage == null) {
                return []
            } else {
                // Sinon, retourner le contenu du localStorage
                JSON.parse(productInLocalStorage)
            }
        }
    };
        // Créer une fonction pour ajouter les éléments du produit choisis dans le panier
        function addBasket(cart) {
            let productInLocalStorage = getBasket();
        }
    

    if (basket == null || basket.lenght == 0) {
        // Si le panier n'existe pas, le créer en objet dans un tableau 
        cart = [{
        id: id,
        color: color,
        quantity: Number(quantity),
        //price: Number(priceElement.textContent)
        }];

        // Créer une fonction d'ajout au panier 
        function addBasket(cart) {
        // Récupérer les éléments du produit choisi par l'utilisateur
        let productInLocalStorage = getBasket();
        };

        // Créer un message d'alerte pour confirmer l'ajout du produit au panier
        let addBasketConfirm = () => {
            alert('Le produit a bien été ajouté au panier')
        addBasketConfirm(cart)   // ???? PLACEMENT AVANT OU APRÈS L'ACCOLADE ????
        }
    } else {
        // Vérifier si 2 produits sont similaires 
        const found = false;

            
        
    }

    
});

// Créer un message pour confirmer que le produit a bien été ajouté au panier
/*
// else {
    addProductConfirm(productDetails)
}

}
*/

/* Créer une fonction pour l'ajout du/des produit(s) sélectionné(s) par l'utilisateur dans le panier
function addToCart(productDetails) {}  */
// Redirection sur une url relative cart.html une fois qu'on a ajouté au panier ?
//window.location.href = "cart.html"

// Créer une fonction pour enregistrer le panier
function saveBasket(productInLocalStorage) {
    localStorage.setItem("panier", JSON.stringify(productInLocalStorage))
}

// Créer une fonction de récupération du panier
function getBasket() {
    // Récupérer les informations du panier existant (choisies par l'utilisateur)
    let productInLocalStorage = localStorage.getItem("panier");
    if (productInLocalStorage == null) {
        // Retourner un tableau vide si le panier est vide
        return [];
    } else {
        // Sinon retourner le contenu du localStorage
        return JSON.parse(productInLocalStorage)
    }
}

