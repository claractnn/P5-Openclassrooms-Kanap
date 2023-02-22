//Renommer le titre de la page 
document.title = "Panier";

//Initialiser la page en appelant les deux fonctions principales
emptyCart();
displayItems();

//La panier est vide
function emptyCart() {
    //Récupérer les données du localstorage
    let cart = getCart();
    //Si le panier est vide, null ou undefined, afficher un message 
    if (cart == null || cart == [] || cart == "" || cart == undefined) {
        document.querySelector('h1').textContent = "Votre panier est vide !";
        document.getElementById('totalQuantity').innerHTML = `0`;
        document.getElementById('totalPrice').innerHTML = `0`;
    };
};

//Fonction qui récupère les données du localstorage du panier
function getCart() {
    let cart = localStorage.getItem("panier");
    if (cart == null || cart == [] || cart == "" || cart == undefined || cart.length == 0) {
        return [];
    } else {
        return JSON.parse(cart);
    };
};

//Fonction pour sauvegarder le panier
function saveCart(cart) {
    window.localStorage.setItem('panier', JSON.stringify(cart));
};

//Fonction qui affiche tous les produits du panier
function displayItems() {
    let cart = getCart();
    for (let item of cart) {
        getItem(item)
    };
};

//Fonction qui requête l'API avec la méthode fetch 
function getItem(item) {
    let apiUrlItem = `http://localhost:3000/api/products/` + item.id;
    fetch(apiUrlItem)
        .then(response => response.json())
        .then(product =>
            displayItem(product, item))
        .catch(() => document.querySelector('h1').textContent = 'Le serveur rencontre un problème')
};

//Fonction contenant le gabarit de l'affichage d'un produit
function displayItem(product, item) {
    document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
    <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${item.color}</p>
            <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    </article>`;
    calculateTotals();
    changeQuantityEvent();
    itemToDeleteEvent();
};

//Dynamiser la page en modifiant et supprimant les produits
//Fonction qui sera utilisée pour l'action de supprimer
function itemToDeleteEvent() {
    let allErase = document.querySelectorAll('.deleteItem');
    for (let erase of allErase) {
        erase.addEventListener('click', () => removeItem(erase));
    };
};

//Fonction pour supprimer l'élément du DOM
function removeItem(deleteDom) {
    //Cibler le produit à supprimer
    let itemSelect = deleteDom.closest('.cart__item');
    //Retirer l'élément courant du DOM
    itemSelect.remove();
    deleteItemFromCart(itemSelect);
};

//Fonction pour supprimer l'élément du localstorage
function deleteItemFromCart(deleteItem) {
    let cart = getCart();
    //Créer et retourner un nouveau tableau avec une fonction callback
    cart = cart.filter(p => p.id != deleteItem.dataset.id || p.color != deleteItem.dataset.color);
    //Sauvegarder le panier 
    saveCart(cart);
    //Mettre à jour la quantité et le prix totaux
    calculateTotals();
};

//Modifier la quantité d'un élément
//Fonction qui sera utilisée pour l'action de changer la quantité
function changeQuantityEvent() {
    let allQty = document.querySelectorAll('.itemQuantity');
    for (let qty of allQty) {
        qty.addEventListener('change', () => changeQuantityToCart(qty));
    };
};

//Fonction qui modifie la quantité
function changeQuantityToCart(qty) {
    //Cibler la quantité à changer
    let cartItem = qty.closest('.cart__item');
    //Récupérer les données du localstorage
    let cart = getCart();
    //Renvoyer la valeur du premier élément trouvé dans le tableau
    let itemFound = cart.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    itemFound.quantity = Number(qty.value);
    //Si la quantité trouvée est supérieur à 100 ou inférieur à , avertir l'utilisateur
    if (itemFound.quantity > 100 || itemFound.quantity < 1) {
        alert('Veuillez indiquer une quantité entre 1 et 100')
    } else {
        //Sauvegarder le panier
        saveCart(cart);
        //Mettre à jour la quantité et le prix totaux
        calculateTotals();
    };
};

//Fonction pour la quantité totale
function totalQuantity() {
    let cart = getCart();
    //Initialiser la quantité totale à 0
    let totalQuantity = 0;
    //Exécuter la fonction addQuantityToTotal sur chaque élément du panier
    cart.forEach(addQuantityToTotal);
    function addQuantityToTotal(item) {
        totalQuantity += item.quantity;
    };
    document.getElementById('totalQuantity').textContent = totalQuantity;
};

//Fonction pour le prix total
function totalPrice() {
    let itemQuantity = document.querySelectorAll('.itemQuantity');
    let cartItems = document.querySelectorAll('.cart__item__content__description');
    //Initialiser le prix du produit à 0
    let itemPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        itemPrice += parseInt(cartItems[i].lastElementChild.textContent) * itemQuantity[i].value;
    };
    document.getElementById('totalPrice').textContent = itemPrice;
};

function calculateTotals() {
    totalQuantity();
    totalPrice();
}