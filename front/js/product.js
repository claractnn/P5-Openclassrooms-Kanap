
// Récupérer l'id du produit dans l'url
// Créer une nouvelle URL à partir de l'URL donnée et ajouter searchParams pour manipuler les paramètres de requête d'URL 
let params = (new URL(document.location)).searchParams;

//Ajouter l'id à l'Url 
const id = params.get('id');
const apiProductUrl = 'http://localhost:3000/api/products/' + id;
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

//Créer toutes les constantes du produit 
const imageElement = document.getElementsByClassName('item__img')[0];
const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');
const descriptionElement = document.getElementById('description');
const colorsElement = document.getElementById('colors');

//Fonction pour récupérer le panier du localStorage
function getCart() {
    let cart = localStorage.getItem("panier");
    if (cart == null || cart == [] || cart == "" || cart == undefined || cart.length == 0) {
        return [];
    } else {
        return JSON.parse(cart);
    };
};

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
//Fonctions pour retourner les valeurs respectives des produits (couleur et quantité)
function colorValue() {
    let color = document.getElementById('colors');
    return color.value
};
function quantityValue() {
    let quantity = document.getElementById('quantity');
    return quantity.value
};

//Fonction de redirection à la page panier 
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
        //Si la couleur n'est pas sélectionnée, avertir l'utilisateur
        if (product.color == "" || product.color == null) {
            alert('Veuillez choisir une couleur');
        //Si la quantité est supérieur à 100 ou inférieur à 1, avertir l'utilisateur
        } else if (product.quantity > 100 || product.quantity < 1) {
            alert(`Le nombre d'articles doit être en 1 et 100 inclus`);
        } else {
            //Sinon - avertir l'utilisateur que les produits ont bien été ajoutés
            //- ajouter le(s) produit(s) sélectionné(s), 
            //- rediriger vers la page panier et 
            alert('Produit(s) ajouté(s) au panier !');
            addToCart(product);
            goToCart();
        }
    })
};
addToCartClick();

//Fonction ajouter le produit dans le localStorage
function addToCart(product) {
    let cart = getCart();
    //Si le panier est vide, créer un tableau de l'objet produit
    if (!cart || cart.length === 0) {
        window.localStorage.setItem("panier", JSON.stringify([product]));
    } else {
        //Sinon, filtrer pour savoir si un produit ayant le même id et la même couleur existe déjà dans le panier
        const cartFiltered = cart.filter(item => item.id == product.id && item.color == product.color);
        const productFound = cartFiltered[0];
        //Si le produit existe, ajouter la quantité sélectionnée à la quantité déjà existante
        if (productFound != undefined) {
            productFound.quantity = productFound.quantity + product.quantity;
            //Si la quantité du produit est supérieur à 100, la redéfinir à 100 et prévenir l'utilisateur
            if (productFound.quantity > 100) {
                productFound.quantity = 100;
                alert('La quantité totale ne doit pas dépasser 100');
            }
        } else {
            //Pousser le produit dans le panier
            cart.push(product);
        }
        //Sauvegarder le panier dans le local storage
        window.localStorage.setItem('panier', JSON.stringify(cart));
    }
};

