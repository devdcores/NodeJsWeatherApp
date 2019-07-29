const weatherSearchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherSearchForm.addEventListener('submit', (e) => {

    console.log('asdasd')
    e.preventDefault();
    const location = searchInput.value;

    p1.textContent = 'Loading...';
    p2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error;
            } else {
                p1.textContent = data.location;
                p2.textContent = data.forecast;
            }
        })
    })
})