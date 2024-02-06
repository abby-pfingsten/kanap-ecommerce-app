/* Grab Elements from the Page */
const productImage = document.getElementsByClassName("item__img")[0];
const productTitle = document.getElementById("title");
const productDescription = document.getElementById("description");
const productPrice = document.getElementById("price");

const dropdown = document.getElementsByTagName("select")[0];
const addToCart = document.getElementById("addToCart");
const itemsInCart = document.getElementsByTagName("input")[0];

/* Insert Into Dom Func */

// create function to insert product into HTML
function insertProdOnPage(
  response,
  productImage,
  productTitle,
  productDescription,
  productPrice,
  dropdown
) {
  // productImage
  const imgSection = document.createElement("img");
  imgSection.setAttribute("src", response.imageUrl);
  imgSection.setAttribute("alt", response.altTxt);
  productImage.appendChild(imgSection);

  // productTitle
  productTitle.textContent = response.name;

  // productPrice
  productPrice.textContent = response.price;

  // productDescription
  productDescription.textContent = response.description;

  // product colors--dropdown
  for (let i in response.colors) {
    const colorOption = document.createElement("option");
    colorOption.value = response.colors[i];
    colorOption.textContent = response.colors[i];
    dropdown.appendChild(colorOption);
  }
}

/* URL Content and API Call */

// grab the current url
const url = new URL(document.URL);

// grab the ID of the url
const urlId = url.searchParams.get("id");
// create a new request
let apiRequest = new XMLHttpRequest();

// fetch the data
apiRequest.open("GET", "http://localhost:3000/api/products/" + urlId);
apiRequest.send();

// onreadystatechange function
apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    const response = JSON.parse(apiRequest.response);

    insertProdOnPage(
      response,
      productImage,
      productTitle,
      productDescription,
      productPrice,
      dropdown
    );
  }
};

/* Add Products to Cart */

// initialize empty array for items
let cartArray = [];
// initialize empty object to hold item info
let cartItem = {};

// makes it so that it doesn't reset when you
// change to a new product
if (JSON.parse(localStorage.getItem("cart"))) {
  cartArray = JSON.parse(localStorage.getItem("cart"));
} else {
  cartArray = [];
}

// add item details to cart everytime the
// add to cart button is pushed
addToCart.addEventListener("click", ($event) => {
  const isAlreadyInArray = cartArray.find(
    (item) => item.id === urlId && item.color === dropdown.value
  );

  // if the item ID and color are already in the array
  // we just want to modify the quantity and not add
  // something new
  if (isAlreadyInArray) {
    for (let item in cartArray) {
      if (
        cartArray[item].id === urlId &&
        cartArray[item].color === dropdown.value
      ) {
        // change both number types to ints
        cartArray[item].quantity = parseInt(cartArray[item].quantity);

        cartArray[item].quantity += parseInt(itemsInCart.value);
      }
    }
  } else {
    // add the product details to the object
    cartItem = {
      id: urlId,
      quantity: parseInt(itemsInCart.value),
      color: dropdown.value,
    };

    // append the object to the array
    cartArray.push(cartItem);
    alert("Item Successfully Added!");
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
});
