// Récupérer l'id du produit dans l'Url 

// Créer une nouvelle URL à partir de l'URL donnée et ajouter searchParams pour manipuler les paramètres de requête d'URL 
let params = (new URL(document.location)).searchParams;

// Ajouter l'id à l'Url 
const productId = params.get('id');
const apiProductUrl = 'http://localhost:3000/api/products/' + productId;
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
            let productColors = `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
            const displayColors = parser.parseFromString(productColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);
        }
    })
    .catch(() => {
        alert("Le serveur ne répond plus");
    });

// AJOUT DES PRODUITS DANS LE PANIER

// Définir les éléments d'un produit sélectionné par l'utilisateur
let selectColor = document.getElementById("colors");
let selectQuantity = document.getElementById('quantity');

// Créer une constante pour le bouton "ajouter au panier"
const addToCartButton = document.querySelector('#addToCart');

// Définir les éléments du tableau 
let productColor = selectColor.value;
let productQuantity = selectQuantity.value;

// Modifier le tableau en ajoutant des eventlistener quand l'utilisateur choisi une couleur ou un nombre d'articles
selectColor.addEventListener("input", e => productColor = e.target.value);
selectQuantity.addEventListener("input", e => productQuantity = e.target.value);

// Créer un eventListener pour le bouton "ajouter au panier" avec certaines instructions 
addToCartButton.addEventListener("click", (event) => {
    // Créer un objet avec tous les éléments du produit 
    let productDetails = {
        id: productId,
        color: productColor,
        quantity: Number(productQuantity),
        // price: priceElement.value
    }
    if (productColor == '') {
        alert('Veuillez sélectionner une couleur')
    } else if (productQuantity < 1 || productQuantity == NaN) {
        alert('Veuillez indiquer un nombre d\'articles')
    } else if (productQuantity > 100) {
        alert('Veuillez indiquer un nombre d\'articles inférieur à 100')
    } //else ajouter la future fonction qui affiche la page panier 

    // Convertir les clés et valeurs de l'objet en string 
    window.localStorage.setItem("productDetails", JSON.stringify(productDetails));

    // Créer une variable pour récupérer l'objet (parse the string) 
    let addProductDetails = window.localStorage.getItem("productDetails");
    console.log(JSON.parse(addProductDetails));
});

// function addToCart (productDetails) {}

// Récupérer les données choisies par l'utilisateur au moment du click (couleur et quantité)
        





