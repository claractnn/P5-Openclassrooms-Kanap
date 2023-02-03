// Récupérer les données à partir du local storage -- fonction pour récupérer les données du panier
let basketList = JSON.parse(window.localStorage.getItem("panier"));

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
};

function displayBasketList() {
    document.getElementById('cart__items').innerHTML += 
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
             </article>`
}

// AFFICHER TOUS LES ÉLÉMENTS DÉTAILLÉS SUR LA PAGE PANIER
// Créer une fonction async pour afficher correctement chaque élément du panier
async function displayBasketList() {
    // Initialiser la quantité totale et le prix total en tant que nombre
    //let totalQuantity = 0;
    //let totalPrice = 0;
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
            //cartItems += productDetails;
            // Ajouter la quantité choisie
            //totalQuantity += parseInt(basketList[i].quantity);
            // Ajouter le prix et le multiplier par la quantité 
            //totalPrice += data.price * basketList[i].quantity;
        }
    }
    // Afficher les détails du produit 
    document.getElementById('cart__items').innerHTML = cartItems;
    itemToDelete();
    changeQuantity();
    totalQuantity();
    totalPrice();
    // Afficher la quantité et le prix totaux
    //document.getElementById('totalQuantity').innerHTML = totalQuantity;
    //document.getElementById('totalPrice').innerHTML = totalPrice;
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
    // Supprimer l'élément du DOM
    itemSelect.remove();
    deleteItemFromBasket(itemSelect);
};

// Créer une fonction pour supprimer l'élément du localstorage
function deleteItemFromBasket(deleteItem) {
    let basketList = JSON.parse(window.localStorage.getItem("panier"));
    basketList = basketList.filter(p => p.id != deleteItem.dataset.id || p.color != deleteItem.dataset.color);
    // Sauvegarder le panier 
    window.localStorage.setItem("panier", JSON.stringify(basketList));
};

// Modifier la quantité d'un élément
// Créer une fonction qui sera utilisée pour l'action de changer la quantité

function changeQuantity() {
    let allQty = document.querySelectorAll('.itemQuantity');
    for (let qty of allQty) {
        qty.addEventListener('change', () => changeQuantityToCart(qty));
    }
};

function changeQuantityToCart(qty) {
    let cartItem = qty.closest('.cart__item');
    // Récupérer les données du localstorage
    let basketList = JSON.parse(window.localStorage.getItem("panier"));
    let itemFound = basketList.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    //checkQuantityValue();
    itemFound.quantity = Number(qty.value);
    if (itemFound.quantity > 100 || itemFound.quantity < 1) {
        alert('Veuillez indiquer une quantité entre 1 et 100')
    } else {
        // reload();
         // Sauvegarder le panier
        window.localStorage.setItem('panier', JSON.stringify(basketList));
    }
    totalQuantity();
    totalPrice();
};

function totalQuantity() {  
    let basketList = JSON.parse(window.localStorage.getItem("panier"));
    let totalQuantity = 0;
    basketList.forEach(addQuantityToTotal);
        function addQuantityToTotal(item) {   
            totalQuantity += item.quantity;
        };
    document.getElementById('totalQuantity').textContent = totalQuantity;
};

function totalPrice() {
    let totalPrice = 0;
    let cartItemForPrice = document.querySelectorAll('cart__item');
    cartItemForPrice.forEach(addPriceToTotal);
        function addPriceToTotal(cartItem) {
            let quantityForPrice = cartItem.querySelector('itemQuantity').value;
            let priceForPrice = cartItem.querySelector('totalPrice').textContent;
            totalPrice += priceForPrice * quantityForPrice;
        }
    document.getElementById('totalPrice').textContent = totalPrice;
};




// function checkQuantityValue(qty) {
  //  let valueQty = document.getElementById('itemQuantity');
    
    /*
    let quantity = document.getElementById('itemQuantity');
    let qtyMax = document.getElementById("100").max;
    let qtyMin = document.getElementById("1").min;
    if(qtyMax == false || qtyMin == false){
    // if(qty < 1 || qty > 100) {
        alert('Veuillez indiquer une quantité entre 1 et 100');
    }*/
//};




/*
// DYNAMISER LA PAGE (MODIFICATION QUANTITÉ ET SUPPRESSION ARTICLE)
function changeQuantity() {
    let inputQuantity = document.querySelectorAll(".itemQuantity");
    for(let qty of inputQuantity) {
        qty.addEventListener('change', () => changeQuantityToCart(qty))
    }
};

// Modifier la quantité d'un produit
function changeQuantityToCart(qty) {
    let cartItem = qty.closest('.cart__item');
    let basketList = JSON.parse(window.localStorage.getItem("panier"));
    let foundItem = basketList.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    foundItem.quantity = Number(qty.value);
    // Sauvegarder le panier dans le localStorage
    window.localStorage.setItem("panier", JSON.stringify(basketList))
};


changeQuantity();
*/
/*
function deleteItem() {
    let button =
}


function changeQuantity() { 
    // Récupérer les données du panier 
    let basketList = JSON.parse(window.localStorage.getItem("panier"));
    // Pointer la balise qui contient l'input
    let inputQuantity = document.querySelectorAll('.itemQuantity');

    for(let i = 0; i < basketList.length; i ++) {

        // Écouter l'événement du changement de quantité
        inputQuantity.addEventListener('change', (e) => {
            e.preventDefault();
                
            let newQuantity = e.target.value;
            basketList.quantity = newQuantity;
    


            /*
            if (newQuantity > 0 || newQuantity <= 100) {
                basketList[i].quantity = newQuantity;
                window.localStorage.setItem("panier", JSON.stringify(basketList));
            } else {
                alert('Veuillez saisir une quantité entre 1 et 100')
            }
        })
    }
    
}
changeQuantity(); */