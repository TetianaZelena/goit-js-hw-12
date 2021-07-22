  
export default function refs() {
    return {
      input: document.getElementById('search-box'),
      countryInfo: document.querySelector('.country-info'),
      countryList: document.querySelector('.country-list'),
    };
}