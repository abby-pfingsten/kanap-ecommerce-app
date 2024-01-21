console.log("helloworld");
/* Inserting Data Into index.html */

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    insertProdOnPage(sections);
    // console.log(sections);
  });

// get existing element from page
const sectionHolder = document.querySelector("section");
// console.log(sectionHolder);

// create function to insert product into HTML
function insertProdOnPage(sections) {
  for (let i in sections) {
    const section = sections[i];

    // we are creating new a section
    const newSection = document.createElement("a");

    // set the attribute so that the href is unique to each prod
    newSection.setAttribute("href", `./product.html?id=${section._id}`);
    newSection.innerHTML = `
            <article>
                <img src="${section.imageUrl}" alt="${section.altTxt}">
                <h3 class="productName">${section.name}</h3>
                <p class="productDescription">${section.description}</p>
            </article>
        `;

    sectionHolder.appendChild(newSection);
  }
}
