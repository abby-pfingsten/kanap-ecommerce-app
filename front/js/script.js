console.log("helloworld");

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
const sectionHolder = document.querySelector('section');
// console.log(sectionHolder);

// create function to insert product into HTML
function insertProdOnPage(sections) {
    for (let i in sections) {
        const section = sections[i];
        console.log(section);

    }

}