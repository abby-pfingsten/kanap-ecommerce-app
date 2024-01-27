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

    //   grab delete button
    deleteButton = newArticle.querySelector(".deleteItem");
    //   add event listener for delete
    deleteButton.addEventListener("click", ($event) => {
      // grab the closest article as element to remove
      elementToRemove = newArticle.closest("article");
      // remove from parent (DOM Modification)
      sectionHolder.removeChild(elementToRemove);

      // grab defining characteristics of element (LocalStorage Mod)
      const elementId = elementToRemove.getAttribute("data-id");
      const elementColor = elementToRemove.getAttribute("data-color");

      // find the correct index from the cartArray
      const elementToDeleteLocation = cartArray.findIndex(
        (item) => item.id === elementId && item.color == elementColor
      );

      // TODO : ADD IF ELSE FOR IF YOU DELETE AND IT IS THE LAST ITEM

      // Adjust Quantity and Total Price Based On Deletes
      numQuantity -= cartArray[elementToDeleteLocation].quantity;
      totalQuantity.textContent = numQuantity.toString();

      numPrice -=
        productInformation.price * cartArray[elementToDeleteLocation].quantity;
      totalPrice.textContent = numPrice.toLocaleString("en-US");

      cartArray.splice(elementToDeleteLocation, 1);
      localStorage.setItem("cart", JSON.stringify(cartArray));
    });

    quantityButton = newArticle.querySelector(".itemQuantity");
    quantityButton.addEventListener("change", ($event) => {
      // grab the closest article as element to remove
      elementToUpdateQuantity = newArticle.closest("article");
      // grab defining characteristics of element (LocalStorage Mod)
      const elementId = elementToUpdateQuantity.getAttribute("data-id");
      const elementColor = elementToUpdateQuantity.getAttribute("data-color");

      // find the correct index from the cartArray
      const elementToChangeQuantity = cartArray.findIndex(
        (item) => item.id === elementId && item.color == elementColor
      );

      cartArray[elementToChangeQuantity].quantity = $event.target.value;
      localStorage.setItem("cart", JSON.stringify(cartArray));

      //   numQuantity = $event.target.value;
      //   totalQuantity.textContent = numQuantity.toString();

      //   numPrice -=
      //     productInformation.price * cartArray[elementToChangeQuantity].quantity;
      console.log(productInformation.price);
      //   totalPrice.textContent = numPrice.toLocaleString("en-US");

      //   cartArray[elementToChangeQuantity].quantity = $event.target.value;
    });
    //   add message once you add an item to cart
  }
  /* Update the Total Quantity/Price */
  totalQuantity.textContent = numQuantity.toString();
  totalPrice.textContent = numPrice.toLocaleString("en-US");
}
