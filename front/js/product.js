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

let cartArray = [];

if (JSON.parse(localStorage.getItem("cart"))) {
  cartArray = JSON.parse(localStorage.getItem("cart"));
} else {
  cartArray = [];
}

let cartItem = {};
addToCart.addEventListener("click", ($event) => {
  console.log(cartArray);
  const isAlreadyInArray = cartArray.find(
    (item) => item.id === urlId && item.color === dropdown.value
  );

  if (isAlreadyInArray) {
    for (let item in cartArray) {
      if (item.id === urlId && item.color === dropdown.value) {
        item.quantity += itemsInCart.value;
      }
    }
  } else {
    // add the product details to the object
    cartItem = {
      id: urlId,
      quantity: itemsInCart.value,
      color: dropdown.value,
    };

    // append the object to the array
    cartArray.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  // console.log(JSON.parse(localStorage.getItem("cart")));
});
