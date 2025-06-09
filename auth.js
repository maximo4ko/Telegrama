document.addEventListener('DOMContentLoaded', function() {
    // Переключение между вкладками входа и регистрации
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех вкладок и форм
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-tab-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке и форме
            this.classList.add('active');
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });
    
    // Обработка формы входа
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Здесь должна быть проверка пользователя
        // Для демо просто переходим в мессенджер
        window.location.href = 'app.html';
    });
    
    // Обработка формы регистрации
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]:nth-of-type(1)').value;
        const username = this.querySelector('input[type="text"]:nth-of-type(2)').value;
        const password = this.querySelector('input[type="password"]:nth-of-type(1)').value;
        const confirmPassword = this.querySelector('input[type="password"]:nth-of-type(2)').value;
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        
        // Здесь должна быть регистрация пользователя
        // Для демо просто переходим в мессенджер
        window.location.href = 'app.html';
    });
});
