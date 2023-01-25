
// Récupérer les données à partir du local storage
let basketList = JSON.parse(window.localStorage.getItem("panier"));
console.table(basketList)

// Si le panier est vide, afficher un message d'erreur
if (!basketList || basketList.length == 0) {
    const parser = new DOMParser();
    let errorMessage = `<article class="cart__item"><p>Votre panier est vide !</p></article>`
    const displayErrorMessage = parser.parseFromString(errorMessage, "text/html");
    cartSection.appendChild(displayErrorMessage.body.firstChild);
    // Sinon, afficher le panier avec la fonction 
} else {
    displayBasketList(basketList);
}

// AFFICHER LE PANIER SUR LA PAGE PANIER

// Créer une fonction async pour afficher correctement chaque élément du panier
async function displayBasketList() {
    // Initialiser la quantité totale et le prix total
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i = 0; i < basketList.length; i++) {
        let id = basketList[i].id;
        let color = basketList[i].color;
        let quantity = basketList[i].quantity;
        let cartSection = document.getElementById('cart__items');
        const apiProductUrl = 'http://localhost:3000/api/products/' + id;
        const response = await fetch(apiProductUrl);
        if (response.ok) {
            const data = await response.json();
            const productDetails =
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
                        <p>Qté : ${quantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                    </div>
                </div>
             </article>`;
            document.getElementById('cart__items').innerHTML += productDetails;
            // Afficher correctement la quantité et le prix totaux
            
            // Afficher la quantité totale
            totalQuantity += parseInt(basketList[i].quantity);
            document.getElementById('totalQuantity').innerHTML = totalQuantity;

            // Afficher le prix total
            totalPrice += data.price * basketList[i].quantity;
            document.getElementById('totalPrice').innerHTML = totalPrice;

        }
        
    // MODIFIER LA QUANTITÉ DU PRODUIT DIRECTEMENT SUR LA PAGE PANIER
        // Créer un événement de type change

        
    };
    
}


