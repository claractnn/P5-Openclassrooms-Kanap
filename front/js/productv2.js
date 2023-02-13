
// Récupérer l'id du produit dans l'url
// Créer une nouvelle URL à partir de l'URL donnée et ajouter searchParams pour manipuler les paramètres de requête d'URL 
let params = (new URL(document.location)).searchParams;

// Ajouter l'id à l'Url 
const id = params.get('id');
const apiProductUrl = 'http://localhost:3000/api/products/' + id;
console.log(apiProductUrl)
getProduct();

//Requête GET pour récupérer le produit via l'id
function getProduct() {
fetch(apiProductUrl)
    .then(res => res.json())
    .then((product) => displayProduct(product))
    .catch(() => {
        document.getElementById('title').innerHTML = `Le serveur ne répond plus`
    });
};

// Créer toutes les constantes du produit 
const imageElement = document.getElementsByClassName('item__img')[0];
const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');
const descriptionElement = document.getElementById('description');
const colorsElement = document.getElementById('colors');

//Créer une fonction pour récupérer le panier du ls
function getCart() {
    let cart = localStorage.getItem("panier");
    if (cart == null || cart == [] || cart == "" || cart == undefined || cart.length == 0) {
        return [];
    } else {
        return JSON.parse(cart);
    };
};

//Fonction pour sauvegarder le panier
function saveCart() {
    window.localStorage.setItem('panier', JSON.stringify(cart));
}

//Fonction pour afficher la page avec tous les éléments 
function displayProduct(product) {
    displayProductDetails(product);
    displayColorsOptions(product);
};

//Fonction pour afficher le contenu du produit dans le DOM
function displayProductDetails(product) {
        document.title = product.name
        imageElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        titleElement.innerHTML = `<h1>${product.name}</h1>`;
        priceElement.innerHTML = `${product.price}`;
        descriptionElement.innerHTML = `${product.description}`;
};

//Fonction pour afficher les options de couleurs
function displayColorsOptions(product) {
    const colors = document.getElementById('colors');
        for (i = 0; i < product.colors.length; i++) {
            colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        };
};

//Ajouter les produits dans le panier
//Fonctions pour retourner les valeurs respectives des produits
function colorValue() {
    let color = document.getElementById('colors');
    return color.value
};

function quantityValue() {
    let quantity = document.getElementById('quantity');
    return quantity.value
};

//Fonction de redirection à la page panier après avoir choisi un ou plusieurs produit(s)
function goToCart() {
    window.location.href='cart.html';
};

//Définir la variable pour le bouton
const button = document.getElementById('addToCart');

//Fonction ajouter le produit sélectionné quand on clique sur le bouton "Ajouter au panier" avec les conditons
function addToCartClick() {
    button.addEventListener("click", (e) => {
        let quantity = quantityValue();
        let color = colorValue();
        //Objet du produit
        const product = {
            id: id,
            color: color,
            quantity: Number(quantity)
        };
        if (product.color == "" || product.color == null) {
            alert('Veuillez choisir une couleur');
        } else if (product.quantity > 100 || product.quantity < 1) {
            alert(`Le nombre d'articles doit être en 1 et 100 inclus`)
        } else {
            alert('Produit(s) ajouté(s) au panier !')
            addToCart(product);
            //Redirection automatique vers la page panier
            goToCart();
            //Sauvegarder le panier
            saveCart();
        }
    })
};
addToCartClick();

//Fonction ajouter le produit dans le localstorage
function addToCart(product) {
    let cart = getCart();
    if (!cart || cart.length === 0) {
        window.localStorage.setItem("panier", JSON.stringify([product]));
    } else {
        const cartFiltered = cart.filter(item => item.id == product.id && item.color == product.color) 
        const productFound = cartFiltered[0];
        if (productFound != undefined) {
            productFound.quantity = productFound.quantity + product.quantity;
            if (productFound.quantity > 100) {
                productFound.quantity = 100;
                alert('La quantité totale ne doit pas dépasser 100');
            }
        } else {
            //Pousser le produit dans le panier
            cart.push(product);
        }
    }
};