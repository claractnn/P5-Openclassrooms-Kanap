// Créer une nouvelle URL à partir de l'URL donnée et ajouter searchParams pour manipuler les paramètres de requête d'URL 
let params = (new URL(document.location)).searchParams;

// Ajouter l'id à l'Url 
const id = params.get('id');

// Récupérer les données à partir du local storage
let basket = JSON.parse(window.localStorage.getItem("panier"));
console.table(basket)

// Initialiser la quantité totale et le prix total
// let totalQuantity = 0;
// let totalPrice = 0;

// Si le panier est vide, afficher un message d'erreur
if (!basket || basket.length == 0) {
    const parser = new DOMParser();
    let errorMessage = `<article class="cart__item"><p>Votre panier est vide !</p></article>`
    const displayErrorMessage = parser.parseFromString(errorMessage, "text/html");
    cartSection.appendChild(displayErrorMessage.body.firstChild);
    // Sinon, afficher le panier avec la fonction 
} else {
    displayBasket(basket);
}

// AFFICHER LE PANIER SUR LA PAGE PANIER

// Créer une fonction async pour afficher correctement chaque élément du panier
async function displayBasket(data) {
    for (let i = 0; i < basket.length; i++) {
        let id = basket[i].id;
        let color = basket[i].color;
        let quantity = basket[i].quantity;
        let cartSection = document.getElementById('cart__items');
        const apiProductUrl = 'http://localhost:3000/api/products/' + id;
        const response = await fetch(apiProductUrl);
        if (response.ok) {
            const data = await response.json();
            const productDetails = await
            `<article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${color}</p>
                <p>${data.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article> `;
          document.getElementById('cart__items').innerHTML += productDetails;
        }
    };
    
}

// Vérifier si les éléments sont présents dans le tableau panier

