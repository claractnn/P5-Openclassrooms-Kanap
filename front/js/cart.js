// Récupérer les données à partir du local storage -- fonction pour récupérer les données du panier
// let basket = JSON.parse(window.localStorage.getItem("panier"));
// console.table(basket)
function getBasket() {
    let basket = window.localStorage.getItem("panier");
    if (!basket || basket == []) {
        document.querySelector('h1').textContent = "Votre panier est vide";
        document.getElementById('totalQuantity').innerHTML = `0`;
        document.getElementById('totalPrice').innerHTML = `0`;
        return [];
    } else {
        return JSON.parse(basket);
    }
};
let basket = getBasket();

// Si le panier est vide, afficher un message d'erreur
if (!basket || basket.length == 0) {
    getBasket();
    const parser = new DOMParser();
    let cartSection = document.getElementById('cart__items');
    let errorMessage = `<article class="cart__item"><p>Votre panier est vide !</p></article>`
    const displayErrorMessage = parser.parseFromString(errorMessage, "text/html");
    cartSection.appendChild(displayErrorMessage.body.firstChild);
    // Sinon, afficher le panier avec la fonction 
} else {
    displayBasket(basket);
};



// AFFICHER TOUS LES ÉLÉMENTS DÉTAILLÉS SUR LA PAGE PANIER
// Créer une fonction async pour afficher correctement chaque élément du panier
async function displayBasket() {
    // Initialiser la quantité totale et le prix total en tant que nombre
    //let totalQuantity = 0;
    //let totalPrice = 0;
    // Initialiser la section de la carte avec un contenu vide
    let cartItems = '';
    // Parcourir le tableau du panier
    for (let i = 0; i < basket.length; i++) {
        // Déclarer les variables des détails du produit 
        let id = basket[i].id;
        let color = basket[i].color;
        let quantity = basket[i].quantity;
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
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
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
            //totalQuantity += parseInt(basket[i].quantity);
            // Ajouter le prix et le multiplier par la quantité 
            //totalPrice += data.price * basket[i].quantity;
        }
    }
    // Afficher les détails du produit 
    document.getElementById('cart__items').innerHTML = cartItems;
    // Afficher la quantité et le prix totaux
    // document.getElementById('totalQuantity').innerHTML = totalQuantity;
    // document.getElementById('totalPrice').innerHTML = totalPrice;
    itemToDelete();
    changeQuantity();
    // window.location.reload();

};

// DYNAMISER LA PAGE (MODIFICATION QUANTITÉ ET SUPPRESSION ARTICLE)
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
};


// Modifier la quantité d'un élément
// Créer une fonction qui sera utilisée pour l'action de changer la quantité

function changeQuantity() {
    let allQty = document.querySelectorAll('.itemQuantity');
    for (let qty of allQty) {
        qty.addEventListener('change', () => changeQuantityToCart(qty));
    }
    totalQuantity();
    totalPrice();
};

function changeQuantityToCart(qty) {
    let cartItem = qty.closest('.cart__item');
    // Récupérer les données du localstorage
    let basket = JSON.parse(window.localStorage.getItem("panier"));
    let itemFound = basket.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    //checkQuantityValue();
    itemFound.quantity = Number(qty.value);
    if (itemFound.quantity > 100 || itemFound.quantity < 1) {
        alert('Veuillez indiquer une quantité entre 1 et 100')
    } else {
         // Sauvegarder le panier
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
   /* cartItems.forEach(addPrice());
    function addPrice(cartItem) {
        let quantity = cartItem.querySelector('.itemQuantity').value;
        let price = cartItem.querySelector('h2 + p + p > span').textContent;
        totalPrice += quantity * price;
    };
};*/

/*function totalPrice() {
    let totalPrice = 0;
    let basket = getBasket();
    // let cartItem = document.querySelector('.cart__item');
    basket.forEach(addPriceToTotal);
    function addPriceToTotal(cartItm) {
        let totalQuantity = cartItm.querySelector('.itemQuantity').value;
        let price = (cartItm.closest('.totalPrice')).textContent;
        totalPrice += basket[i].price * totalQuantity;
    }
    document.getElementById('totalPrice').innerHTML = totalPrice;
    // reload();
};
*/