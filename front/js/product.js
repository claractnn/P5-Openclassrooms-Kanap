// Récupérer l'id du produit dans l'url
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

// Créer une fonction de redirection à la page panier après avoir choisi un ou plusieurs produit(s)
function goToCart() {
    window.location.href='cart.html';
}

// Créer une variable pour le bouton "ajouter au panier"
const button = document.getElementById("addToCart");
// Créer un eventListener pour le bouton "ajouter au panier"  
button.addEventListener("click", (event) => {
    // Définir la couleur et la quantité choisies à leurs valeurs respectives
    let color = colorValue();
    let quantity = quantityValue();
    // Créer un objet du produit pour le panier (id, couleur et quantité)
    const product = {
        id: id,
        color: color,
        quantity: Number(quantity)
    };
    // Créer une variable pour récupérer l'objet panier (parse the string) 
    let basket = JSON.parse(window.localStorage.getItem("panier"));

    // Si le panier n'existe pas encore, on crée le tableau de l'objet product
    if (!basket || basket.length === 0) {
        window.localStorage.setItem("panier", JSON.stringify([product]));
    } else {
        // Verifier si le produit existe en parcourant le panier avec la boucle
        const basketFiltered = basket.filter(p => p.id === product.id && p.color === product.color);
        const productFound = basketFiltered[0];
            if (productFound) {
                // Si le produit est trouvé, on ajoute la nouvelle quantité sélectionnée à l'existante
                productFound.quantity += product.quantity;
            // Si le produit et inférieur à 100 ou supérieur à 1, on ajoute le produit 
            } else if (quantity <= 100 || quantity > 1) {
                basket.push(product);
                //Message à l'utilisateur pour lui indiquer que le(s) produit(s) a ou ont bien été ajouté(s) au panier
                alert(`Produit(s) ajouté(s) au panier !`);
            } else if (quantity > 100 || quantity < 1) {
                //Message d'alerte pour notifier que la quantité choisie doit se trouver entre 1 et 100 inclus
                alert(`La quantité choisie doit se trouver entre 1 et 100 inclus`);
            } else if (color == null || color == "") {
                alert(`Veuillez choisir une couleur`)
            } else {
                //Message d'alerte pour notifier que la quantité choisie doit se trouver entre 1 et 100 inclus
                alert(`La quantité choisie doit se trouver entre 1 et 100 inclus`);
            } 
        //Redirection automatique vers la page panier
        goToCart();
        //Sauvegarder le panier
        window.localStorage.setItem("panier", JSON.stringify(basket));
        
        };
    });




   