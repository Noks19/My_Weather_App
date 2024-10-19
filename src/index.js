function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchInput.value;
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchSubmit);
