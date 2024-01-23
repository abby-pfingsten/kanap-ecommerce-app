// grab cart array from local storage
const cartArray = JSON.parse(localStorage.getItem("cart"))[1];

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    const productLocation = sections.findIndex(
      (item) => item._id === cartArray.id
    );
  });

function insertItemsIntoCart(cartArray, sections) {
  // find the correct information from the sections
  const productLocation = sections.findIndex(
    (itemId) => itemId.id === cartArray.id
  );

  console.log(itemId);

  // create the new article
  const newArticle = document.createElement("article");

  // set the attributes
  newArticle.setAttribute("data-id", cartArray.id);
  newArticle.setAttribute("data-color", cartArray.color);
  // set the class
  newArticle.classList.add("cart__item");

  // add the image div
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("cart__item__img");
  const itemImage = document.createElement("img");
  //   itemImage.setAttribute("src", cartArray.d);
}
