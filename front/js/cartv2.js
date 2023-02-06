// AFFICHER LA PAGE PANIER 
getBasket();
displayBasket();

// RÉCUPÉRER LES DONNÉES DU LOCALSTORAGE

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

/*function getBasket() {
    let basket = JSON.parse(window.localStorage.getItem("panier"));
    // Si le panier est vide, afficher un message d'erreur
    if (!basket || basket.length == 0) {
        const parser = new DOMParser();
        let cartSection = document.getElementById('cart__items');
        let errorMessage = `<article class="cart__item"><p>Votre panier est vide !</p></article>`
        const displayErrorMessage = parser.parseFromString(errorMessage, "text/html");
        cartSection.appendChild(displayErrorMessage.body.firstChild);
        
    }
};*/

function saveBasket() {
    window.localStorage.setItem("panier", JSON.stringify(basket));
};

function displayBasket() {
    displayBasketList();
    itemToDelete();
    changeQuantity();
    totalQuantity();
    totalPrice();
};

// Afficher les produits 
function displayBasketList() {
    let basket = getBasket();
        let params = (new URL(document.location)).searchParams;
        const id = params.get('id');
        // const apiUrl = 'http://localhost:3000/api/products/' + id;
        fetch('http://localhost:3000/api/products/' + id) 
            .then(res => res.json())
            .then((data) => {
                displayBasketDetails(data)
            })
            .catch(() => document.querySelector('h1').textContent = 'Le serveur est momentanément indisponible');    
        };


//function displayItem() {
    
//};

   /*function displayItem() {
    let params = (new URL(document.location)).searchParams;
    const id = params.get('id');
    const apiUrl = 'http://localhost:3000/api/products/' + id;
    fetch(apiUrl) 
        .then((res) => res.json())
        if (res.ok) {
        displayBasketDetails(data)
        } else {
        document.querySelector('h1').textContent = 'Le serveur est momentanément indisponible';
        }
    };*/    

function displayBasketDetails(data) {
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
};

// DYNAMISER LA PAGE

// SUPPRIMER UN PRODUIT
function itemToDelete() {
    let allErase = document.querySelectorAll('cart__tem');
    for(erase of allErase) {
        erase.addEventListener('click', () => removeItem(erase));
    };
};

function removeItem(deleteDom) {
    let itemSelect = deleteDom.closest('.cart__item');
    //Supprimer le produit du DOM
    itemSelect.remove();
    deleteItemFromBasket(itemSelect);
};

function deleteItemFromBasket(deleteItem) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != deleteItem.dataset.id || p.color != deleteItem.dataset.color)
    //Sauvegarder le panier
    window.localStorage.setItem('panier', JSON.stringify(basket));
};


//MODIFIER LA QUANTITÉ D'UN PRODUIT
function changeQuantity() {
    let allQuantity =  document.querySelectorAll('.itemQuantity');
    for(qty of allQuantity) {
        qty.addEventListener('change', () => changeQuantityToBasket(qty));
    }
};

function changeQuantityToBasket(qty) {
    let cartItem = qty.closest('.cart__item');
    //Récupérer les données du localstorage
    let basket = getBasket();
    let itemFound = basket.find(p => p.id == cartItem.dataset.id && p.color == cartItem.dataset.color);
    itemFound.quantity = Number(qty.value);
        if (itemFound.quantity > 100 || itemFound.quantity <1) {
            alert('Veuillez indiquer une quantité entre 1 et 100 inclus');
        } else {
            saveBasket();
        }
};

function totalQuantity() {
    let basket = getBasket();
    let totalQuantity = 0;
    basket.forEach(addQuantityToTotal);
        function addQuantityToTotal(item) {
            totalQuantity += item.quantity;
        }
        document.getElementById('totalQuantity').textContent = totalQuantity;
};

function totalPrice() {
    let totalPrice = 0;
    let carItems = document.querySelector('.cart__item');
    // Définir que carItems est un array ?
    carItems.forEach(addPrice);
    function addPrice(cartItem) {
        let quantity = cartItem.querySelector('.itemQuantity').value;
        let price = cartItem.querySelector('h2 + p + p > span').textContent;
        totalPrice += quantity * price;
    };
    document.getElementById('totalPrice').textContent = totalPrice;
};