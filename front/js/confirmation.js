//Récupérer l'id de la commande pour afficher le numéro de commande
const id = new URL(window.location.href).searchParams.get("orderid");
console.log(id)
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;
