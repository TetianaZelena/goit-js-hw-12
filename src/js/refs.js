  
export default function refs() {
    return {
      input: document.querySelector('#search-box'),
      countryInfo: document.querySelector('.country-info'),
      countryList: document.querySelector('.country-list'),
    };
}