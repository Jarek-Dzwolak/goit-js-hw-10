import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries.js';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', event => {
  const searchText = event.target.value.trim();
  if (searchText === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchText)
    .then(countries => {
      if (countries.length === 1) {
        fetchCountryInfo(countries[0].name.official);
        countryList.innerHTML = '';
      } else if (countries.length > 1 && countries.length <= 10) {
        renderCountryList(countries);
        countryInfo.innerHTML = '';
      } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      console.log(error);
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
});

function renderCountryList(countries) {
  const html = countries
    .map(
      country => `
      <li>
        <img width="50px"  src="${country.flags.svg}" alt="${country.name.official} flag">
        <span>${country.name.official}</span>
      </li>
    `
    )
    .join('');
  countryList.innerHTML = `<ul>${html}</ul>`;
}

function fetchCountryInfo(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      const country = data[0];
      const languages = Array.isArray(country.languages)
        ? country.languages.map(language => language.name).join(', ')
        : Object.values(country.languages).join(', ');
      const html = `
        <h2>${country.name.official}</h2>
        <p>Capital: ${country.capital.join(', ')}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${languages}</p>
        <img src="${country.flags.svg}" alt="${
        country.name.official
      } flag" width="200">
      `;
      countryInfo.innerHTML = html;
    })
    .catch(error => {
      console.log(error);
      countryInfo.innerHTML = '';
    });
}
console.log(country.languages);
