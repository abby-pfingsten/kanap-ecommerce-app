// grab cart array from local storage
const cartArray = JSON.parse(localStorage.getItem("cart"));
// get the section to insert the products into
const sectionHolder = document.getElementById("cart__items");
// get the total quanityt
let totalQuantity = document.getElementById("totalQuantity");
// get total price
let totalPrice = document.getElementById("totalPrice");

let numPrice = 0;
let numQuantity = 0;

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    insertItemsIntoCart(cartArray, sections);
  });

/* Function To Insert Products */
function insertItemsIntoCart(cartArray, sections) {
  for (let i in cartArray) {
    // find the correct index from the sections
    const productLocation = sections.findIndex(
      (item) => item._id === cartArray[i].id
    );
    // get the rest of the product info from API
    const productInformation = sections[productLocation];
    //   create new article section
    const newArticle = document.createElement("article");

    // set the attributes
    newArticle.setAttribute("data-id", cartArray[i].id);
    newArticle.setAttribute("data-color", cartArray[i].color);
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
                    <p>${cartArray[i].color}</p>
                    <p>€${productInformation.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity:</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>    
    
    `;
    // append all the children to the section
    sectionHolder.appendChild(newArticle);

    numQuantity += cartArray[i].quantity;
    numPrice += productInformation.price * cartArray[i].quantity;

    /* Modify Quantity in Cart */

    deleteButton = newArticle.querySelector(".deleteItem");
    deleteButton.addEventListener("click", ($event) => {
      console.log("delete button");
      elementToRemove = newArticle.closest("article");
      sectionHolder.removeChild(elementToRemove);
      //   console.log(elementToRemove);
      //   console.log(newArticle);
      //   console.log(deleteButton);
    });

    quantityButton = newArticle.querySelector(".itemQuantity");
    quantityButton.addEventListener("change", ($event) => {
      console.log("quantity button");
      console.log($event.target.value);
      //   console.log(quantityButton);
    });

    //   get element.closest and log
    //   when you delete a cart you have to delete from local storage
    //    and dom
    //   once you're done modifying have to setItem in local storage
    //   add message once you add an item to cart
  }
  /* Update the Total Quantity/Price */
  totalQuantity.textContent = numQuantity.toString();
  totalPrice.textContent = numPrice.toLocaleString("en-US");
}
