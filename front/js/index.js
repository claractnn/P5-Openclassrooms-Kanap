//Créer une variable de l'URL de l'API
let apiUrl =
'http://localhost:3000/api/products';

//Requêter l'API pour l'ensemble des produits 
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        displayProducts(data)
        console.log(data)
    })
    .catch(() => {
        alert("Impossible d'afficher les produits");
    });

//Afficher tous les produits du catalogue sur la page index
function displayProducts(data) {
    for (product of data) {
        const productCard = `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
          document.getElementById('items').innerHTML += productCard;
    }
};

