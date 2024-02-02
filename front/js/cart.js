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
    editCart(cartArray, sections);
  });

/* Function To Insert Products */
function editCart(cartArray, sections) {
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

    numQuantity += parseInt(cartArray[i].quantity);
    numPrice += productInformation.price * cartArray[i].quantity;

    /* Delete Item From Cart */

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
      // Adjust Quantity and Total Price Based On Deletes
      numQuantity -= parseInt(cartArray[elementToDeleteLocation].quantity);
      totalQuantity.textContent = numQuantity;

      numPrice -=
        productInformation.price * cartArray[elementToDeleteLocation].quantity;
      totalPrice.textContent = numPrice.toLocaleString("en-US");

      cartArray.splice(elementToDeleteLocation, 1);
      localStorage.setItem("cart", JSON.stringify(cartArray));
    });

    /* Update Cart Quantity */

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

      // change the proper index to the value set from the UI
      cartArray[elementToChangeQuantity].quantity = parseInt(
        $event.target.value
      );

      // push that to local storage
      localStorage.setItem("cart", JSON.stringify(cartArray));

      // grab the OG cart array, minus the one that was modified
      const cartWithoutModifiedItem = cartArray.filter((item) => {
        return !(
          item.id === cartArray[elementToChangeQuantity].id &&
          item.color == cartArray[elementToChangeQuantity].color
        );
      });

      // adjust the price down below
      let indexOfSectionsArray = 0;
      let modifiedPrice = 0;
      for (let i in cartArray) {
        let indexOfSectionsArray = sections.findIndex(
          (item) => item._id === cartArray[i].id
        );
        modifiedPrice +=
          cartArray[i].quantity * sections[indexOfSectionsArray].price;
      }
      numPrice = modifiedPrice;
      totalPrice.textContent = numPrice.toLocaleString("en-US");

      // add together the quantity of the products from the above array
      let counterForSubsettedArray = 0;
      let priceForSubsettedArray = 0;
      for (let i in cartWithoutModifiedItem) {
        counterForSubsettedArray += parseInt(
          cartWithoutModifiedItem[i].quantity
        );
      }

      // get the total of the modified product and the total from above
      let totalWithModification = parseInt(
        counterForSubsettedArray + parseInt($event.target.value)
      );
      //  update the total quantity on the UI
      numQuantity = parseInt(totalWithModification);
      totalQuantity.textContent = numQuantity;
    });
  }

  totalQuantity.textContent = numQuantity;
  totalPrice.textContent = numPrice.toLocaleString("en-US");
}

/* Validate User Input */

// TODO: use regex to catch for case that there is at least one character
const hasLetters = new RegExp("^[A-Za-z\\s]+$");
const emailFormat = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

const firstNameError = document.getElementById("firstNameErrorMsg");
const firstNameInput = document.querySelector("#firstName");

firstNameInput.addEventListener("blur", () => {
  if (hasLetters.test(firstNameInput.value)) {
    firstNameError.textContent = "";
  } else {
    firstNameError.textContent = "Invalid name input";
  }
});

const lastNameError = document.getElementById("lastNameErrorMsg");
const lastNameInput = document.querySelector("#lastName");

lastNameInput.addEventListener("blur", () => {
  if (hasLetters.test(lastNameInput.value)) {
    lastNameError.textContent = "";
  } else {
    lastNameError.textContent = "Invalid name input";
  }
});

const addressError = document.getElementById("addressErrorMsg");
const addressInput = document.querySelector("#address");

const cityError = document.getElementById("cityErrorMsg");
const cityInput = document.querySelector("#city");

cityInput.addEventListener("blur", () => {
  if (hasLetters.test(cityInput.value)) {
    cityError.textContent = "";
  } else {
    cityError.textContent = "Invalid city";
  }
});

const emailError = document.getElementById("emailErrorMsg");
const emailInput = document.querySelector("#email");

emailInput.addEventListener("input", () => {
  if (emailFormat.test(emailInput.value)) {
    emailError.textContent = "";
  } else {
    emailError.textContent = "Invalid email";
  }
});

/* Send POST Request */

const orderButton = document.getElementById("order");

let contactInfo = {};
orderButton.addEventListener("click", ($event) => {
  $event.preventDefault();
  if (
    hasLetters.test(firstNameInput.value) &
    hasLetters.test(lastNameInput.value) &
    hasLetters.test(addressInput.value) &
    hasLetters.test(cityInput.value) &
    emailFormat.test(emailInput.value)
  ) {
    let products = cartArray.map((i) => i.id);

    // grab unique product ID
    products = [...new Set(products)];

    contactInfoForOrder = {
      contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,
      },
      products: products,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactInfoForOrder),
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((contactInfoForOrder) => {});
  }
});
