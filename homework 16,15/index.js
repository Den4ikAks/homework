// function checkFields() {
//     const field1 = document.getElementById('field1').value;
//     const field2 = document.getElementById('field2').value;

    
//     const message = document.getElementById('message');

    
//     if (field1 !== '' && field2 !== '') {
//         message.textContent = 'Обидва поля заповнені';
//         message.style.color = 'green';
//     } else {
//         message.textContent = 'Не всі поля заповнені';
//         message.style.color = 'red';
//     }
// }






// function checkSum() {
//     const num1 = parseFloat(document.getElementById('num1').value);
//     const num2 = parseFloat(document.getElementById('num2').value);

//     const message = document.getElementById('message');

    
//     if ((num1 + num2) > 10) {
//         message.textContent = 'Сума більша за 10';
//         message.style.color = 'green';
//     } else {
//         message.textContent = 'Сума менша або дорівнює 10';
//         message.style.color = 'red';
//     }
// }






// const textInput = document.getElementById("textInput");
// const checkButton = document.getElementById("checkButton");
// const result = document.getElementById("result");

// checkButton.addEventListener("click", function() {
//     const text = textInput.value;
    
//     if (text.includes("JavaScript")) {
//         result.textContent = "Текст містить слово JavaScript";
//     } else {
//         result.textContent = "Текст не містить слово JavaScript";
//     }
// });



const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');
const countryDetails = document.getElementById('country-details');

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const fetchCountries = async (query) => {
  if (!query) {
    countryList.innerHTML = '';
    countryDetails.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    if (!response.ok) throw new Error('Країни немає');
    const countries = await response.json();
    renderCountries(countries);
  } catch (error) {
    console.error(error);
    countryList.innerHTML = '<li>Країна не знайдена</li>';
    countryDetails.innerHTML = '';
  }
};

const renderCountries = (countries) => {
  countryList.innerHTML = '';
  countryDetails.innerHTML = '';

  if (countries.length > 10) {
    countryList.innerHTML = '<li>Введіть точнішу назву</li>';
    return;
  }

  if (countries.length === 1) {
    const country = countries[0];
    countryDetails.innerHTML = `
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
    `;
  } else {
    countries.forEach((country) => {
      const li = document.createElement('li');
      li.textContent = country.name.common;
      li.classList.add('country-item');
      countryList.appendChild(li);
    });
  }
};

searchBox.addEventListener('input', debounce((e) => {
  const query = e.target.value.trim();
  fetchCountries(query);
}, 500));