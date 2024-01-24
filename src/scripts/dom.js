import { allCountriesApi } from "./api";

const rootElement = document.querySelector("#root");
let query = "";
let region = "";

const createCountryItemElement = (country) => {
  const countryElement = document.createElement("li");
  countryElement.classList.add("countryItem");

  const countryStructure = `
    <div class="countryCard">
      <img
        class="countryCard__flag"
        src="${country.flag}"
        alt="${country.countryName} flag"
      />
      <div class="countryCard__info">
        <div class="countryCard__countryName">${country.countryName}</div>
        <div class="countryCard__population"><b>Population</b>: ${
          country.population > 0
            ? country.population.toLocaleString()
            : "uninhabited"
        }</div>
        <div class="countryCard__region"><b>Region</b>: ${country.region}</div>
        <div class="countryCard__capital"><b>Capital</b>: ${
          country.capital ? country.capital : "does not have"
        }</div>
      </div>
    </div>
  `;
  countryElement.innerHTML = countryStructure;
  return countryElement;
};

const createListElement = async () => {
  const errorDiv = document.querySelector(".countryNotFound");

  const listElement = document.createElement("ul");
  listElement.classList.add("countriesContainer");
  const countiresData = await allCountriesApi();

  let filteredData = countiresData.filter((country) =>
    country.countryName.toLowerCase().includes(query)
  );

  if (region) {
    filteredData = filteredData.filter((country) => country.region === region);
  }

  filteredData.sort((country1, country2) =>
    country1.countryName < country2.countryName ? -1 : 1
  );

  filteredData.length === 0
    ? errorDiv.classList.add("visible")
    : errorDiv.classList.remove("visible");

  filteredData.forEach((country) => {
    listElement.appendChild(createCountryItemElement(country));
  });

  return listElement;
};

export const renderCountriesList = async function (countries) {
  rootElement.innerHTML = "";
  rootElement.appendChild(await createListElement(countries));
};

document.querySelector("#query").addEventListener("input", (e) => {
  query = e.target.value.toLowerCase().trim();
  renderCountriesList();
});

document.querySelector("#region").addEventListener("change", (e) => {
  region = e.target.value;
  renderCountriesList();
});
