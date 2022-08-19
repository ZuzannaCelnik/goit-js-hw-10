import './css/styles.css';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector(`#search-box`);
const сountryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);

inputSearchBox.addEventListener('input', debounce(showCountry, DEBOUNCE_DELAY));

function showCountry() {
  fetchCountries(inputSearchBox.value.trim())
    .then(country => {
      countryInfo.innerHTML = '';
      сountryList.innerHTML = '';
      console.log(country.length);
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length <= 10) {
        renderCountryList(country);
      } else if (country.length === 1) {
        renderCountryInfo(country);
      }
    })

    .catch(showError);
}

function renderCountryList(country) {
  const markup = country
    .map(({ flags, name }) => {
      return `<li class="country-item">
    <img class="country-item__img" src="${flags.svg}" 
  width="30" alt="flag of ${name.common}"/>
  <span class="country-item__name">${name.official}</span></li>`;
    })
    .join('');
  сountryList.innerHTML = markup;
}

function renderCountryInfo([{ name, capital, population, flags, languages }]) {
  const markupInfo = `<img src="${flags.svg}" 
  width="50" alt="flag of ${name.official}"/>
  <span class="country-item__name">${name.official}</span>
  <p class="info">Capital:<span>${capital}</span></p>
  <p class="info">Population:<span>${population}</span></p>
  <p class="info">Languages:<span>${Object.values(languages).join(
    ', '
  )}</span></p>`;

  countryInfo.innerHTML = markupInfo;
}

function showError(error) {
  console.log(error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
  countryInfo.innerHTML = '';
  сountryList.innerHTML = '';
}

