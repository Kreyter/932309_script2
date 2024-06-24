document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const passwordList = document.getElementById('password-list');

    form.addEventListener('submit', event => {
        event.preventDefault();
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const url = document.getElementById('url').value;

        const passwordData = { login, password, url };
        savePassword(passwordData);
        form.reset();
        displayPasswords();
    });

    function savePassword(passwordData) {
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push(passwordData);
        localStorage.setItem('passwords', JSON.stringify(passwords));
    }

    function displayPasswords() {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordList.innerHTML = '';

        passwords.forEach((passwordData, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <span><strong>Логин:</strong> ${passwordData.login}</span>
                    <span><strong>Пароль:</strong> <span class="password" data-password="${passwordData.password}">********</span></span>
                    <span><strong>URL:</strong> <a href="${passwordData.url}" target="_blank">${passwordData.url}</a></span>
                </div>
                <div class="actions">
                    <button class="copy" onclick="copyPassword('${passwordData.password}')"><i class="fas fa-copy"></i></button>
                    <button class="toggle-password" onclick="togglePassword(this)"><i class="fas fa-eye"></i></button>
                    <button onclick="deletePassword(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
            passwordList.appendChild(li);
        });
    }

    window.copyPassword = function(password) {
        navigator.clipboard.writeText(password).then(() => {
            alert('Пароль скопирован в буфер обмена!');
        });
    }

    window.deletePassword = function(index) {
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displayPasswords();
    }

    window.togglePassword = function(button) {
        const passwordSpan = button.parentElement.previousElementSibling.querySelector('.password');
        const password = passwordSpan.getAttribute('data-password');
        if (passwordSpan.textContent === '********') {
            passwordSpan.textContent = password;
            button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordSpan.textContent = '********';
            button.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }

    displayPasswords();
});