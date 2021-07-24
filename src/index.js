import './sass/main.scss';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
// const debounce = require('lodash.debounce');
import eventsTemplates from './templates/events';
import eventsTemplatesTumb from './templates/events_tumb';
import refsGet from './js/refs';

const refs = refsGet();
let countrySearch = '';
function fetchcountry(name) {
return fetch(`https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`)
   .then(response => {
      return response.json();
   }) 
}

const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
   e.preventDefault();
   countrySearch = refs.input.value.trim(); 
   fetchcountry(countrySearch)
      .then(renderCartCountry)
      .catch(error => console.log(renderCartCountry))
      
    } 
// function renderCartCountry(country) {
//    refs.countryInfo.insertAdjacentHTML('beforeend', eventsTemplatesTumb(country))
// }
function renderCartCountry(country) {
   //  console.log(country.length);
   if (country.length === 1) {
      clearData()
    return  refs.countryInfo.insertAdjacentHTML('beforeend',  eventsTemplatesTumb(country))
   }
   else if (country.length > 1 && country.length <= 10) {
      clearData();
      return refs.countryInfo.insertAdjacentHTML('beforeend',  eventsTemplates(country));
   }
   else if
      (country.length > 10) {
      clearData();
      Notify.info(`Too many matches found. Please enter a more specific name.`);
   }
   else {
     Notify.failure(`Oops, there is no country with that name`);
   }
}

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}  