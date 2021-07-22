import './sass/main.scss';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
// const debounce = require('lodash.debounce');
import eventsTemplates from './templates/events';
import eventsTemplatesTumb from './templates/events_tumb';
import refsGet from './js/refs';

const refs = refsGet();


  
function fetchcountry(){
return fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;languages')
   .then(response => {
      return response.json();
   })
}


const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
   e.preventDefault();
   const country = e.target.value.trim();
   if (country.length === 0) {
      clearData()
      return;
   }
fetchcountry(country)
      .then(countries => {
         if (countries.lenght === 1) {
           refs.countryInfo.innerHTML = eventsTemplatesTumb (countries);
           
         }
         return countries;
      })
      .then(countries => {
         if (countries.lenght > 1 && countries.lenght <= 10) {
            clearData();
     refs.countryList.innerHTML =  eventsTemplates(data);
         }
         return countries;
      })
      .then(data => {
         if (countries.lenght > 10) {
            clearData();
             Notify.info('Too many matches found. Please enter a more specific name.');
         }
      })

      .catch(error => {
         clearData();
         Notify.failure('Oops, there is no country with that name');
   } );
};

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}