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
  }
};
