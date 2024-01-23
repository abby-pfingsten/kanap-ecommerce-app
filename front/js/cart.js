// grab cart array from local storage
const cartArray = JSON.parse(localStorage.getItem("cart"))[1];

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    insertItemsIntoCart(cartArray, sections);
  });

function insertItemsIntoCart(cartArray, sections) {
  // find the correct index from the sections
  const productLocation = sections.findIndex(
    (item) => item._id === cartArray.id
  );

  console.log(productLocation);

  /* Create New Article */
  const newArticle = document.createElement("article");

  // set the attributes
  newArticle.setAttribute("data-id", cartArray.id);
  newArticle.setAttribute("data-color", cartArray.color);
  // set the class
  newArticle.classList.add("cart__item");

  /* Create Image Div */
  const imageDiv = document.createElement("div");
  // add class
  imageDiv.classList.add("cart__item__img");

  const itemImage = document.createElement("img");
  itemImage.setAttribute("src", productLocation.imageUrl);
  itemImage.setAttribute("alt", productLocation.altTxt);

  /* Create Cart Item Content Div */
  const cartItemContentDiv = document.createElement("div");
  // Cart Item Content Description
  const cartItemDescriptionDiv = document.createElement("div");
  const cartItemDescriptionHeader = document.createElement("h2");
  const cartItemDescriptionColor = document.createElement("p");
  const cartItemDescriptionPrice = document.createElement("p");
  // Cart Item Content Settings
  const cartItemContentSettings = document.createElement("div");
  const cartItemSettingsDiv = document.createElement("div");
  const cartItemSettingsQuantity = document.createElement("p");
  const cartItemSettingsInput = document.createElement("input");
  // Cart Item Content Settings Delete
  const cartItemSettingsDelete = document.createElement("div");
  const cartItemSettingsDeleteText = document.createElement("p");
}
