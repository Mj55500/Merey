let loadedUsers = []; 
let addedUsers = []; 

document.getElementById('loadUsers').addEventListener('click', loadUsers);
document.getElementById('addUser').addEventListener('click', addUser);

function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            loadedUsers = data; 
            renderUsers(); 
        });
}

function addUser() {
    const newUserName = document.getElementById('newUserName').value;
    if (newUserName) {
        const newUser = {
            id: Date.now(), 
            name: newUserName
        };
        addedUsers.push(newUser); 
        document.getElementById('newUserName').value = ''; 
        alert('Пользователь добавлен!');
    } else {
        alert('Введите имя пользователя!');
    }
}

function deleteUser(userId) {
    loadedUsers = loadedUsers.filter(user => user.id !== userId);
    addedUsers = addedUsers.filter(user => user.id !== userId);
    renderUsers(); 
}

function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; 

    const allUsers = [...loadedUsers, ...addedUsers];

    allUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteUser(user.id); 
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    });
}