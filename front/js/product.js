/* Grab Elements from the Page */
const productImage = document.getElementsByClassName("item__img")[0];
const productTitle = document.getElementById("title");
const productDescription = document.getElementById("description");
const productPrice = document.getElementById("price");
const dropdown = document.getElementsByTagName("select")[0];
// WHY DO I HAVE TO DO INDEX 0, WHY RETURN HTML COLLECTION

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

  // product colors --dropdown
  // WHY DOES THIS GIVE INDEX AND NOT COLOR
  //   for (let color in response.colors) {
  //     console.log(color);
  //     }

  for (let i in response.colors) {
    const colorOption = document.createElement("option");
    colorOption.value = response.colors[i];
    colorOption.textContent = response.colors[i];
    dropdown.appendChild(colorOption);
  }
}

/* URL Content and API Call*/

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
