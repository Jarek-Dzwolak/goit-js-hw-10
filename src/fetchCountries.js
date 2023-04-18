export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .then(data => data);
};
