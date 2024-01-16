console.log("helloworld");

// grab the data from the backend
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((sections) => {
    // console.log(sections);
  });

// get existing element from page
const sectionHolder = document.querySelector('section');
console.log(sectionHolder);