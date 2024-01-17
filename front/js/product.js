/* Grab Elements from the Page */
const productImage = document.getElementsByClassName("item__img");
// console.log(productImage);

const productTitle = document.getElementById("title");
// console.log(productTitle);

const productDescription = document.getElementById("description");
// console.log(productPrice);

const productPrice = document.getElementById("price");
// console.log(productPrice);

const dropdown = document.getElementsByTagName("select");
// console.log(dropdown);

/* Insert Into Dom Func */

// create an array with all of the elements that
// need to be edited with API data
productPageDOMChanges = [productImage, productTitle, productPrice, dropdown];

// create function to insert product into HTML
function insertProdOnPage(
  response,
  productImage,
  productTitle,
  productDescription,
  productPrice,
  dropdown
) {
  //   for (let i in sections) {
  // productImage
  const imgSection = document.createElement("img");
  imgSection.setAttribute("src", response.imageURl);
  imgSection.setAttribute("src", response.altTxt);
  productImage.appendChild(imgSection);

  // productTitle
  productTitle.textContent = response.name;

  // productDescription
  productDescription.textContent = response.description;

  //   // we are creating new a section
  //   const newSection = document.createElement("a");

  //   // set the attribute so that the href is unique to each prod
  //   newSection.setAttribute("href", `./product.html?id=${section._id}`);
  //   newSection.innerHTML = `
  //             <article>
  //                 <img src=${section.imageUrl} alt=${section.altTxt}>
  //                 <h3 class="productName">${section.name}</h3>
  //                 <p class="productDescription">${section.description}</p>
  //             </article>
  //         `;

  //   sectionHolder.appendChild(newSection);
  //   }
}

/* URL Content and API Call*/

// grab the current url
const url = new URL(document.URL);

// grab the ID of the url
const urlId = url.searchParams.get("id");
console.log(urlId);
// create a new request
let apiRequest = new XMLHttpRequest();

// fetch the data
apiRequest.open("GET", "http://localhost:3000/api/products/" + urlId);
apiRequest.send();

// onreadystatechange function
apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    const response = JSON.parse(apiRequest.response);
    console.log(response);
    insertProdOnPage(
      response,
      productImage,
      productTitle,
      productDescription,
      productPrice,
      dropdown
    );
    //   call insert dom function
  }
};
