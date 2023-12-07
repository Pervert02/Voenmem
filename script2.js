document.getElementById("login-button").addEventListener("click", function () {
    // Получите значения введенного логина и пароля
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Проверка на пустые поля
    if (username.trim() === "" && password.trim() === "") {
        alert("Пожалуйста, заполните оба поля логина и пароля.");
    }
    else if (username.trim() === "") {
        alert("Пожалуйста, заполните поле логина.");
    }
    else if (password.trim() === "") {
        alert("Пожалуйста, заполните поле пароля.");
    }
    else {
        // Проверим, не был ли пользователь ранее зарегистрирован
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const userExists = registeredUsers.some(user => user.username === username && user.password === password);

        if (userExists) {
            alert("Данный пользователь уже зарегистрирован.");
        } else {
            // Добавим нового пользователя в список зарегистрированных
            registeredUsers.push({ username, password });
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

            // Сохраните информацию о входе пользователя в localStorage
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);

            // Перенаправьте пользователя на страницу "autoresetion.html"
            window.location.href = "autoresetion.html";
        }
    }
});