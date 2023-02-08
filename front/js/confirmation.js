//Afficher l'ID de la commande
/** 
    const str = window.location
    const url = new URL(str);
    const id = url.searchParams.get("id");
    const orderId = document.querySelector("#orderId");
    orderId.innerHTML = id;*/
    /*
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const orderId = document.querySelector('#orderId');
    orderId.innerHTML = id;*/

/*function confirm() {

    const orderId = new URL(window.location.href).searchParams.get('id');
    document.getElementById("orderId").textContent = orderId;
    console.log(orderId)
}

confirm();*/

const id = new URL(window.location.href).searchParams.get("orderid");
console.log(id)
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;
