        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser  = JSON.parse(localStorage.getItem('currentUser '));

        if (currentUser ) {
            showWelcomeMessage(currentUser .username);
            document.getElementById('logoutButton').style.display = 'inline-block';
        }

        function showWelcomeMessage(username) {
            document.getElementById('welcomeMessage').innerText = `Добро пожаловать, ${username}!`;
        }

        document.getElementById('loginModalButton').onclick = function() {
            document.getElementById('loginModal').style.display = 'block';
        }

        document.getElementById('registerModalButton').onclick = function() {
            document.getElementById('registerModal').style.display = 'block';
        }

        document.getElementById('closeLoginModal').onclick = function() {
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('loginError').innerText = '';
        }

        document.getElementById('closeRegisterModal').onclick = function() {
            document.getElementById('registerModal').style.display = 'none';
            document.getElementById('registerError').innerText = '';
        }

        document.getElementById('loginButton').addEventListener('click', () => {
            const username = document.getElementById('loginUsername').value;
            const password = btoa(document.getElementById('loginPassword').value);
            const user = users.find(user => user.username === username && user.password === password);
            if (!username || !password) {
                document.getElementById('loginError').innerText = 'Пожалуйста, заполните все поля.';
                return;
            }
            if (user) {
                localStorage.setItem('currentUser ', JSON.stringify(user));
                showWelcomeMessage(user.username);
                document.getElementById('loginModal').style.display = 'none';
                document.getElementById('logoutButton').style.display = 'inline-block';
            } else {
                document.getElementById('loginError').innerText = 'Неверное имя пользователя или пароль.';
            }
        });

        document.getElementById('registerButton').addEventListener('click', () => {
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerPasswordConfirm').value;
            if (!username || !password || !confirmPassword) {
                document.getElementById('registerError').innerText = 'Пожалуйста, заполните все поля.';
                return;
            }
            if (password !== confirmPassword) {
                document.getElementById('registerError').innerText = 'Пароли не совпадают.';
                return;
            }
            const existingUser  = users.find(user => user.username === username);
            if (existingUser ) {
                document.getElementById('registerError').innerText = 'Имя пользователя уже занято.';
                return;
            }
            const newUser  = {
                userID: users.length + 1,
                username,
                password: btoa(password)
            };
            users.push(newUser );
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser ', JSON.stringify(newUser ));
            showWelcomeMessage(newUser .username);
            document.getElementById('registerModal').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'inline-block';
        });

        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('currentUser ');
            alert('Вы вышли из системы.');
            document.getElementById('welcomeMessage').innerText = '';
            document.getElementById('logoutButton').style.display = 'none';
        });

        window.onclick = function(event) {
            if (event.target == document.getElementById('loginModal')) {
                document.getElementById('loginModal').style.display = 'none';
            }
            if (event.target == document.getElementById('registerModal')) {
                document.getElementById('registerModal').style.display = 'none';
            }
        }