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

// Créer deux fonctions pour retourner les valeurs respectives des éléments (produits)
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}

function quantityValue() {
    let quantity = document.getElementById("quantity");
    return quantity.value;
}

/* // Définir les éléments d'un produit sélectionné par l'utilisateur
let selectColor = document.getElementById("colors");
let selectQuantity = document.getElementById('quantity');

// Modifier le tableau en ajoutant des eventlistener quand l'utilisateur choisi une couleur ou un nombre d'articles
selectColor.addEventListener("input", e => color = e.target.value);
selectQuantity.addEventListener("input", e => quantity = e.target.value); */

// Créer une variable pour le bouton "ajouter au panier"
const button = document.getElementById("addToCart");
// Créer un eventListener pour le bouton "ajouter au panier"  
button.addEventListener("click", (event) => {
    // Définir la couleur et la quantité choisies à leurs valeurs respectives
    let color = colorValue();
    let quantity = quantityValue();

    // Ajouter des conditions si les options du produit n'ont pas été choisies
    if (color == '') {
        alert('Veuillez sélectionner une couleur')
    } else if (quantity < 1 || quantity == NaN) {
        alert('Veuillez indiquer un nombre d\'articles')
    } else if (quantity > 100) {
        alert('Veuillez indiquer un nombre d\'articles inférieur à 100')
    } else if (quantity == 1) {
        alert('Votre produit a bien été ajouté au panier! ')
    } else if (quantity > 1) {
        alert('Vos produits ont bien été ajouté au panier !')
    }

    // Créer un objet pour le panier
    const product = {
        id: id,
        color: color,
        quantity: Number(quantity)
    };


// Convertir les clés et valeurs de l'objet en string (car localStorage ne peut pas storer d'objet, renvoie : "[object Object]") 
// window.localStorage.setItem("panier", JSON.stringify(product));

// Créer une variable pour récupérer l'objet panier (parse the string) 
let basket = window.localStorage.getItem("panier");
console.log(JSON.parse(basket))

// Si le panier n'existe pas encore, on crée le tableau de l'objet product
if (!basket || basket.length === 0) {
    window.localStorage.setItem("panier", JSON.stringify([product]));
} else {
    // Verifier si le produit existe dans le panier
    let productFound = false;
    for (let i = 0; i < basket.length; i++) {
        const cartProduct = basket[i];
        if (productFound = true) {
            let productFound = cartProduct;
            // le produit est trouvé si l'id et la couleur sont les mêmes
            productFound = (id === basket[i].id && color === basket[i].color);
        } 
        // si le produit est trouvé, on ajoute la nouvelle quantité sélectionnée à l'existante
        if (productFound) {
            product.quantity += productFound.quantity;
        } else {
            // Sinon on ajoute le produit sélectionné au tableau du panier
            window.localStorage.setItem("panier", JSON.stringify([cartProduct]));
        }

    }}});

 