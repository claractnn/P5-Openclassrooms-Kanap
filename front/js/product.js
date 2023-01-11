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
let color = selectColor.value;
let quantity = selectQuantity.value;

/* définir boucle pour le prix multiplié par le nb d'articles
for (i=0; i < data.price.length; i++) {
    let priceFinal = 
}*/

// Modifier le tableau en ajoutant des eventlistener quand l'utilisateur choisi une couleur ou un nombre d'articles
selectColor.addEventListener("input", e => color = e.target.value);
selectQuantity.addEventListener("input", e => quantity = e.target.value);

// Créer un eventListener pour le bouton "ajouter au panier" avec certaines conditions 
addToCartButton.addEventListener("click", (event) => {
    // Créer un objet avec tous les éléments du produit 
    let productDetails = {
        id: id,
        color: color,
        quantity: Number(quantity),
        // price: priceElement.textContent
    }
    if (color == '') {
        alert('Veuillez sélectionner une couleur')
    } else if (quantity < 1 || quantity == NaN) {
        alert('Veuillez indiquer un nombre d\'articles')
    } else if (quantity > 100) {
        alert('Veuillez indiquer un nombre d\'articles inférieur à 100')
    } else {
        addProductConfirm(productDetails)
    }
    //ajouter la future fonction qui affiche la page panier ?

    // Convertir les clés et valeurs de l'objet en string (car localStorage ne peut pas storer d'objet, renvoie : "[object Object]") 
    window.localStorage.setItem("productDetails", JSON.stringify(productDetails));

    // Créer une variable pour récupérer l'objet (parse the string) 
    let addProductDetails = window.localStorage.getItem("productDetails");
    console.log(JSON.parse(addProductDetails));
});

// Créer un message pour confirmer que le produit a bien été ajouté au panier
let addProductConfirm = () => {
    alert('Le produit a bien été ajouté au panier')
}

// Définir le contenu du panier 
//let basket = 

// Créer une fonction pour l'ajout du/des produit(s) sélectionné(s) par l'utilisateur dans le panier
//function addToCart(productDetails) {}





// Récupérer les données choisies par l'utilisateur au moment du click (couleur et quantité)

// Redirection sur une url relative cart.html une fois qu'on a ajouté au panier ?
//window.location.href = "cart.html"
        





