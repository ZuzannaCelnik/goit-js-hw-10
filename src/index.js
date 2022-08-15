import './css/styles.css';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector(`#search-box`);
const сountryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);

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
