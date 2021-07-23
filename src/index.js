import './sass/main.scss';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
// const debounce = require('lodash.debounce');
import eventsTemplates from './templates/events';
import eventsTemplatesTumb from './templates/events_tumb';
import refsGet from './js/refs';

const refs = refsGet();

function fetchcountry() {
return fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;languages')
   .then(response => {
     
      return response.json();
   })
   
}


const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
   e.preventDefault();
   const countrySearch = e.target.value.trim();
   if (countrySearch.lenght === 0) {
      clearData();
      return;
   }

   console.log(countrySearch)
   fetchcountry(countrySearch)
      .then(renderCartCountry)
      .catch(error => console.log(error))  
     }

// function renderCart(country) {
//    refs.countryInfo.insertAdjacentHTML('beforeend', eventsTemplatesTumb(country)) 
   
// }

function renderCartCountry(countrySearch) {
 
   if (countrySearch.lenght === 1) {
    return  refs.countryInfo.insertAdjacentHTML('beforeend', eventsTemplates(country))
   }
   else if (countrySearch.lenght > 1 && countrySearch.lenght <= 10) {
      clearData();
      return refs.countryInfo.insertAdjacentHTML('beforeend', eventsTemplatesTumb(country));
   }
   else if
      (countrySearch.lenght > 10) {
      clearData();
      Notify.info('Too many matches found. Please enter a more specific name.');
   }
   else {
     Notify.failure('Oops, there is no country with that name');
   }
}

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}  