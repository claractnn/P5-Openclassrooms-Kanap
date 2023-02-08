//Afficher l'ID de la commande

    const str = window.location
    const url = new URL(str);
    const id = url.searchParams.get("id");
    const orderId = document.querySelector("#orderId");
    orderId.innerHTML = id;
    /*
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const orderId = document.querySelector('#orderId');
    orderId.innerHTML = id;*/
