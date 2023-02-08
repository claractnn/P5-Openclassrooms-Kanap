//Initialiser la page en appelant les deux fonctions principales
emptyCart();
displayCart();

//La panier est vide
function emptyCart() {
    //Récupérer les données du localstorage
    let cart = getCart();
    //Si le panier est vide, null ou undefined, afficher un message 
    if(cart == null || cart == [] || cart == "" || cart == undefined) {
        document.querySelector('h1').textContent = "Votre panier est vide !";
    }
};

//Créer une fonction qui récupère les données du localstorage du panier
function getCart() {
    let cart = localStorage.getItem("panier");
    if (cart == null || cart == [] || cart == "" || cart == undefined || cart.length == 0) {
        return [];
    } else {
        return JSON.parse(cart);
    }
};

//Créer une fonction qui regroupe toutes les fonctions de l'affichage de la page panier
function displayCart() {
    displayItems();
    itemToDelete();
    changeQuantity();
}

//Créer une fonction qui affiche tous les produits du panier
function displayItems() {
    let cart = getCart();
    for (let item of cart) {
        getItems(item)
    }
};

//Créer une fonction qui requête l'API avec la méthode fetch 
function getItems(item) {
    let apiUrlItem = `http://localhost:3000/api/products/` + item.id;
    fetch(apiUrlItem)
        .then(response => response.json())
        .then(product =>
            displayItem(product, item))
        .catch(() => document.querySelector('h1').textContent = 'Le serveur rencontre un problème')
};

//Créer une fonction contenant le gabarit de l'affichage d'un produit
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
                <p>Qté : ${item.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    </article>`;
};

//Dynamiser la page en modifiant et supprimant les produits
// Créer une fonction qui sera utilisée pour l'action de supprimer
function itemToDelete() {
    let allErase = document.querySelectorAll('.deleteItem');
    for (let erase of allErase) {
        erase.addEventListener('click', () => removeItem(erase));
    }
};

// Créer une fonction pour supprimer l'élément du DOM
function removeItem(deleteDom) {
    let itemSelect = deleteDom.closest('.cart__item');
    itemSelect.remove();
    deleteItemFromBasket(itemSelect);
};

// Créer une fonction pour supprimer l'élément du localstorage
function deleteItemFromBasket(deleteItem) {
    let basket = JSON.parse(window.localStorage.getItem("panier"));
    basket = basket.filter(p => p.id != deleteItem.dataset.id || p.color != deleteItem.dataset.color);
    // Sauvegarder le panier 
    window.localStorage.setItem("panier", JSON.stringify(basket))
    window.location.reload();
};

// Créer une fonction qui sera utilisée pour l'action de changer la quantité
function changeQuantity() {
    let allQty = document.querySelectorAll('.itemQuantity');
    for (let qty of allQty) {
        qty.addEventListener('change', () => changeQuantityToCart(qty));
    }
    totalQuantity();
    totalPrice();
};

// Créer une fonction qui modifie les quantités choisies par l'utilisateur
function changeQuantityToCart(qty) {
    let cartItem = qty.closest('.cart__item');
    // Récupérer les données du localstorage
    let basket = JSON.parse(window.localStorage.getItem("panier"));
    let itemFound = basket.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    itemFound.quantity = Number(qty.value);
    if (itemFound.quantity > 100 || itemFound.quantity < 1) {
        alert('Veuillez indiquer une quantité entre 1 et 100')
    } else {
        // Sauvegarder le panier
        window.location.reload();
        window.localStorage.setItem('panier', JSON.stringify(basket));
        document.getElementById('totalQuantity').textContent = itemFound.quantity;
    }
};

function totalQuantity() {  
    let basket = getBasket();
    let totalQuantity = 0;
    basket.forEach(addQuantityToTotal);
    function addQuantityToTotal(item) {   
        totalQuantity += item.quantity;
    };
    document.getElementById('totalQuantity').textContent = totalQuantity;
};

function totalPrice() {
    let itemQuantity = document.querySelectorAll('.itemQuantity');
    let cartItems = document.querySelectorAll('.cart__item__content__description');
    let itemPrice = 0;
    for(let i = 0; i < cartItems.length; i++) {
        itemPrice += parseInt(cartItems[i].lastElementChild.textContent) * itemQuantity[i].value;
    }
    document.getElementById('totalPrice').textContent = itemPrice;
};

