//Affifhcer l'ID de la commande

function idOrder() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("#orderId");

    let displayOrderId = document.getElementById('orderId');
    displayOrderId.innertext = orderId;
};

idOrder();