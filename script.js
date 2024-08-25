const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const userTable = document.querySelector('#userTable tbody');
const cityFilter = document.querySelector('#cityFilter');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    populateTable(data);
    populateCityFilter(data);
  })

function populateTable(users) {
  userTable.innerHTML = '';
  users.forEach(user => {
    const row = userTable.insertRow();
    row.insertCell().textContent = user.name;
    row.insertCell().textContent = user.email;
    row.insertCell().textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    row.insertCell().textContent = user.address.city;
  });
}

function populateCityFilter(users) {
  const cities = new Set(users.map(user => user.address.city));
  cityFilter.innerHTML = '';
  cities.forEach(city => {
    const option = document.createElement('option');
    option.textContent = city;
    cityFilter.appendChild(option);
  });
  cityFilter.addEventListener('change', event => {
    const selectedCity = event.target.value;
    const filteredUsers = selectedCity ? users.filter(user => user.address.city === selectedCity) : users;
    populateTable(filteredUsers);
  });
}