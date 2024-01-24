export const allCountriesApi = async () => {
  try {
    const API_URL = "https://restcountries.com/v3.1/all";

    const res = await fetch(API_URL);
    const data = await res.json();

    const datas = data.map((country) => {
      return {
        countryName: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
      };
    });

    return datas;
  } catch (err) {
    throw new Error(err);
  }
};
