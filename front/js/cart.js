// grab cart array from local storage
const cartArray = JSON.parse(localStorage.getItem("cart"))[1];
const sectionHolder = document.getElementById("cart__items");

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    const productLocation = sections.findIndex(
      (item) => item._id === cartArray.id
    );

    insertItemsIntoCart(cartArray, sections);
  });

function insertItemsIntoCart(cartArray, sections) {
  // find the correct index from the sections
  const productLocation = sections.findIndex(
    (item) => item._id === cartArray.id
  );

  console.log(productLocation);

  const productInformation = sections[productLocation];

  /* Create New Article */
  const newArticle = document.createElement("article");

  // set the attributes
  newArticle.setAttribute("data-id", cartArray.id);
  newArticle.setAttribute("data-color", cartArray.color);
  // set the class
  newArticle.classList.add("cart__item");

  // doing inner HTML

  newArticle.innerHTML = `
<div class="cart__item__img">
                  <img src="${productInformation.imageUrl}" alt="${productInformation.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInformation.name}</h2>
                    <p>${cartArray.id}</p>
                    <p>€${productInformation.price}42.00</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity: ${cartArray.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>    
    
    `;

  sectionHolder.appendChild(newArticle);
}
