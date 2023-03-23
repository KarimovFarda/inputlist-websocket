const socket = new WebSocket('ws://localhost:8083');
const reader = new FileReader();

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const listContainer = document.getElementById('list');

reader.addEventListener('loadend', (e) => {
    const text = e.srcElement.result;
    const listItem = document.createElement('li');
    listItem.textContent = text;
    listContainer.appendChild(listItem);
    inputField.value = '';
});

socket.addEventListener('open', function (event) {
    console.log(event)
});

socket.addEventListener('message', function (event) {
    reader.readAsText(event.data);
});

addButton.addEventListener('click', (e) => {
    e.preventDefault()
    const input = inputField.value.trim();
    if (input) {
        socket.send(input)
    }
});