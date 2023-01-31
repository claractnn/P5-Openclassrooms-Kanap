// Récupérer les données à partir du local storage
let basketList = JSON.parse(window.localStorage.getItem("panier"));
console.table(basketList)

// Si le panier est vide, afficher un message d'erreur
if (!basketList || basketList.length == 0) {
    const parser = new DOMParser();
    let cartSection = document.getElementById('cart__items');
    let errorMessage = `<article class="cart__item"><p>Votre panier est vide !</p></article>`
    const displayErrorMessage = parser.parseFromString(errorMessage, "text/html");
    cartSection.appendChild(displayErrorMessage.body.firstChild);
    document.getElementById('totalQuantity').innerHTML = `0`;
    document.getElementById('totalPrice').innerHTML = `0`;
    // Sinon, afficher le panier avec la fonction 
} else {
    displayBasketList(basketList);
}

// AFFICHER TOUS LES ÉLÉMENTS DÉTAILLÉS SUR LA PAGE PANIER
// Créer une fonction async pour afficher correctement chaque élément du panier
async function displayBasketList() {
    // Initialiser la quantité totale et le prix total en tant que nombre
    let totalQuantity = 0;
    let totalPrice = 0;
    // Initialiser la section de la carte avec un contenu vide
    let cartItems = '';
    // Parcourir le tableau du panier
    for (let i = 0; i < basketList.length; i++) {
        // Déclarer les variables des détails du produit 
        let id = basketList[i].id;
        let color = basketList[i].color;
        let quantity = basketList[i].quantity;
        const apiProductUrl = 'http://localhost:3000/api/products/' + id;
        // Requêter l'url du produit 
        const response = await fetch(apiProductUrl);
        // Si la requête a fonctionné, insérer tous les éléments du produit
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
            //Ajouter les détails du produit dans la section de la cart (cart__item)
            cartItems += productDetails;
            // Ajouter la quantité choisie
            totalQuantity += parseInt(basketList[i].quantity);
            // Ajouter le prix et le multiplier par la quantité 
            totalPrice += data.price * basketList[i].quantity;
        }
    }
    // Afficher les détails du produit 
    document.getElementById('cart__items').innerHTML = cartItems;
    // Afficher la quantité et le prix totaux
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
};
changeQuantity();

// DYNAMISER LA PAGE (MODIFICATION QUANTITÉ ET SUPPRESSION ARTICLE)
// Modifier la quantité 
function changeQuantity() { 
    let inputQuantity = document.querySelectorAll('.itemQuantity');
    // Écouter l'événement du changement de quantité
    for (let i = 0; i < inputQuantity.length; i ++) {
        inputQuantity.addEventListener('change', (e) => {
            e.preventDefault();
            
            let newQuantity = inputQuantity.value;

            if (newQuantity > 0 || newQuantity <= 100) {
                basketList[i].quantity = newQuantity;
                window.localStorage.setItem("panier", JSON.stringify(basketList));
            } else {
                alert('Veuillez saisir une quantité entre 1 et 100')
            }
        })
    }
    
};
